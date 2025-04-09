package com.example.s3storage.controller;

import com.example.s3storage.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class StorageController {

    private final S3Service s3Service;

    public StorageController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping("/")
    public String index(Model model) {
        var fileUrls = s3Service.listAllFiles();
        model.addAttribute("files", fileUrls);
        return "index";
    }

    @GetMapping("/files")
    @ResponseBody
    public ResponseEntity<List<String>> getFiles() {
        try {
            var fileUrls = s3Service.listAllFiles();
            return ResponseEntity.ok(fileUrls);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
}

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        var response = new HashMap<String, String>();
        
        try {
            if (file.isEmpty()) {
                response.put("error", "ファイルが選択されていません。");
                return ResponseEntity.badRequest().body(response);
            }
            
            var fileUrl = s3Service.uploadFile(file);
            response.put("fileUrl", fileUrl);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("error", STR."ファイルのアップロードに失敗しました: {e.getMessage()}");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public ResponseEntity<Map<String, String>> deleteFile(@RequestParam("fileUrl") String fileUrl) {
        var response = new HashMap<String, String>();
        
        try {
            s3Service.deleteFile(fileUrl);
            response.put("message", "ファイルが正常に削除されました。");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", STR."ファイルの削除に失敗しました: {e.getMessage()}");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}