---
title: "[iOS] 앱 스토어 심사 리젝 (Guideline 1.2 - Safety - User-Generated Content) 대응"
toc: true
toc_label: "index"
toc_sticky: true
comments: true
---

<p align="center"><img src="https://github.com/user-attachments/assets/893c53b8-7bcd-420f-85c8-5688f37b961e" width="500"></p>
<p align="center">앱 스토어 심사를 넘겼는데 앱이 심사에서 거부됐다 ㅠ</p>

애플이 리젝 사유를 설명하면서 스크린샷을 같이 줬는데, 술 사진이 올라온 채팅방 캡쳐였다. 이게 뭐가 문젠가 싶어서 검색해보니 대략적으로 신고 기능을 추가해야한다는 얘기였는데, *앱에는 사용자를 개별로 차단할 수 있는 기능이 이미 구현된 상태였다.*

>이미 우리는 사용자를 차단할 수 있는 기능이 있다는 것을 애플에게 어필해서 어떻게든 심사에 넘겨볼까 생각했지만... 

사용자 차단과 사용자가 생성한 컨텐츠를 신고할 수 있는 기능은 엄연히 다르고, 근본적으로 문제해결을 하려면 **사용자가 생성한 컨텐츠**에 대해서 개별로 신고할 수 있는 기능을 만들어야 한다는 결론 🥲

## 1. 리젝 사유
**- Bug Fix Submissions**  
The issues we've identified below are eligible to be resolved on your next update. If this submission includes bug fixes and you'd like to have it approved at this time, reply to this message and let us know. You do not need to resubmit your app for us to proceed. Alternatively, if you'd like to resolve these issues now, please review the details, make the appropriate changes, and resubmit.    <br><br>
**- Guideline 1.2 - Safety - User-Generated Content**  
We found in our review that your app includes user-generated content but does not have all the required precautions. Apps with user-generated content must take specific steps to moderate content and prevent abusive behavior.  <br><br>
**- Next Steps**  
To resolve this issue, please revise your app to implement the following precautions: A mechanism for users to flag objectionable content <br><br>
**- Resources**  
Learn more about our policies for user-generated content in [App Review Guideline 1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content).
{: .notice--warning}
 
(번역)  
**- 버그 수정 제출**  
우리가 아래에서 확인한 문제는 다음 업데이트에서 해결될 수 있습니다. 이 제출물에 버그 수정이 포함되어 있고 현재 승인을 받고 싶다면, 이 메시지에 회신하고 저희에게 알려주세요. 우리가 진행하기 위해 앱을 다시 제출할 필요가 없습니다. 또는, 지금 이러한 문제를 해결하고 싶다면, 세부 사항을 검토하고, 적절한 변경을 하고, 다시 제출하십시오.  <br><br>
**- 지침 1.2 - 안전 - 사용자 생성 콘텐츠**  
<span style="background-color:#fff5b1"> 우리는 리뷰에서 당신의 앱에 사용자 생성 콘텐츠가 포함되어 있지만 필요한 모든 예방 조치가 없다는 것을 발견했습니다. 사용자 생성 콘텐츠가 있는 앱은 콘텐츠를 조정하고 학대 행위를 방지하기 위한 구체적인 조치를 취해야 합니다. </span><br><br>
**- 다음 단계**  
이 문제를 해결하려면, 다음과 같은 예방 조치를 시행하기 위해 앱을 수정하십시오: 사용자가 불쾌한 콘텐츠를 표시할 수 있는 메커니즘  <br><br>
**- 자원**  
[앱 검토 지침 1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content)에서 사용자 생성 콘텐츠에 대한 정책에 대해 자세히 알아보십시오.
{: .notice--info}

## 2. 다른 앱 참고 (인스타그램)
인스타그램과 유튜브 앱을 참고해보니 사용자가 만든 자체 컨텐츠에 대해서 (숏폼, 포스팅 등) 무조건 신고할 수 있도록 하는 기능이 구현되어 있었다. 다양하게 신고 사유를 제공하고 있는 것도 확인!!

<p align="center">
  <img src="https://github.com/user-attachments/assets/962d6469-9f9c-4c6a-b600-bd2109b31c72" align="center" width="40%">
  <img src="https://github.com/user-attachments/assets/5a54af29-fc43-4896-8e62-3bee8d868025" align="center" width="41%">
</p>

## 3. 해결
기획 팀에 사용자가 생성한 컨텐츠에 대해서 신고할 수 있는 기능을 기획해달라고 요청했다. 이에 따라 작업을 진행한 뒤 다시 심사를 넘겼고 그제서야 승인을 받을 수 있었다 :) 
