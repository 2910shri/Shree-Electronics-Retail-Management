package com.ShreeElectronics.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
@Service
public class SmsService {
 @Value("${app.sms.api-key:}") private String apiKey;
 public void sendSms(String mobile,String message) {
  if (apiKey==null || apiKey.isBlank()) { System.out.println("SMS skipped: FAST2SMS_API_KEY is not configured."); return; }
  HttpHeaders headers=new HttpHeaders(); headers.set("authorization",apiKey); headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
  MultiValueMap<String,String> body=new LinkedMultiValueMap<>(); body.add("variables_values",message); body.add("route","q"); body.add("numbers",mobile);
  new RestTemplate().postForEntity("https://www.fast2sms.com/dev/bulk",new HttpEntity<>(body,headers),String.class);
 }
}
