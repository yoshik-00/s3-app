package com.example.s3storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;

    @Value("${app.aws.s3.bucket-name}")
    private String bucketName;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        var fileExtension = getFileExtension(file.getOriginalFilename());
        var key = generateUniqueFileName(fileExtension);
        var contentType = file.getContentType();

        // S3にアップロード
        var putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        
        // アップロードされたファイルのURLを返す
        return generateFileUrl(key);
    }

    public List<String> listAllFiles() {
        var listObjectsRequest = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .build();

        var response = s3Client.listObjectsV2(listObjectsRequest);
        
        return response.contents().stream()
                .map(S3Object::key)
                .map(this::generateFileUrl)
                .toList(); // Java 16以降の新しいtoList()メソッド
    }

    public void deleteFile(String fileUrl) {
        var key = extractKeyFromUrl(fileUrl);
        
        var deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        
        s3Client.deleteObject(deleteObjectRequest);
    }

    // ファイルURLからS3キーを抽出するヘルパーメソッド
    private String extractKeyFromUrl(String fileUrl) {
        var parts = fileUrl.split(bucketName + ".s3." + "ap-northeast-1" + ".amazonaws.com/");
        return parts.length > 1 ? parts[1] : "";
    }

    // ユニークなファイル名を生成するヘルパーメソッド
    private String generateUniqueFileName(String extension) {
        return UUID.randomUUID().toString() + extension;
    }

    // ファイルの拡張子を取得するヘルパーメソッド
    private String getFileExtension(String filename) {
        return filename.substring(filename.lastIndexOf("."));
    }

    // S3上のファイルのURLを生成するヘルパーメソッド
    private String generateFileUrl(String key) {
        return STR."https://\{bucketName}.s3.ap-northeast-1.amazonaws.com/\{key}"; // Java 21の文字列テンプレート
    }
}