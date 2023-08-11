const EmailAuthenticationPage = () => {
  return (
    <div>
      <div>
        <div>
          <span>이메일 주소</span>를 인증해 주세요.
        </div>
        <div>Gif</div>
        <div>
          인증 메일이 {}로<br />
          발송 되었습니다.
          <br />
          이메일 인증을 완료하시면 계정 생성이 완료됩니다.
        </div>
        <div>이메일을 받지 못하셨나요?</div>
        <button>다시 보내기</button>
      </div>
    </div>
  );
};

export default EmailAuthenticationPage;
