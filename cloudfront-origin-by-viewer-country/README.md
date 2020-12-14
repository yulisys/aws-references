# CloudFront Origin Server by Viewers Country

Amazon CloudFront 개발자 안내서에서 제공하는 예제 함수 중에서 "[국가 또는 디바이스 유형 헤더에 따른 콘텐츠 개인 설정](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-redirecting-examples)" 부분을 응용한 Lambda@Edge 함수입니다.

예제와 다른 점은 접속 국가에 맞는 도메인으로 Redirect 하지 않고, 접속 국가에 대응해 서비스하는 Origin 서버를 선택하도록 수정되었습니다.

# Country Codes

CloudFront는 접속자의 국가 코드를 HTTP Request Header로 보내주는데, 이 헤더 이름은 `cloudfront-viewer-country` 입니다.

(전체 HTTP Request Header 목록: https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/RequestAndResponseBehaviorCustomOrigin.html#request-custom-headers-behavior)

여기서 사용하는 국가 코드는 `ISO 3166-1 alpha-2`에서 정의한 2자리 영문 코드가 사용되며, 전체 목록은 아래 주소에서 확인할 수 있습니다.
* https://www.iso.org/obp/ui/#search/code/

# Explanations of the code

이 곳의 코드에서는 3개 리전에 서버를 생성하고, 각 리전별로 담당하는 국가를 확인해 해당 Origin 서버로 접속하도록 합니다.
각 리전별로 담당하는 국가는 다음과 같습니다.

* EU (유럽)
  * Austria
  * Belgium
  * Germany
  * Spain
  * France
  * UK
  * Italy
  * Netherlands
  * Sweden
  * Réunion
* US (미국)
  * US
* KR (한국)
  * Korea
  * Others

