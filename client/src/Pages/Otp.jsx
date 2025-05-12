import React, { useRef, useState } from 'react';

const VerificationCodeForm = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(''));

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (index < 5) inputRefs.current[index + 1]?.focus();
    } else if (value === '') {
      const updatedOtp = [...otp];
      updatedOtp[index] = '';
      setOtp(updatedOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const updatedOtp = [...otp];
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      updatedOtp[index] = '';
      setOtp(updatedOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const updatedOtp = [...otp];

    for (let i = 0; i < paste.length; i++) {
      updatedOtp[i] = paste[i];
    }

    setOtp(updatedOtp);
    if (paste.length < 6) {
      inputRefs.current[paste.length]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-[Nunito]">
      <div
        className="text-center shadow"
        style={{
          width: '400px',
          height: '450px',
          borderRadius: '27px',
          border: '0.2px solid #ccc',
          padding: '78px 67px',
          boxSizing: 'border-box',
        }}
      >
        <div className="flex flex-col items-center gap-[50px] h-full justify-between">
          <div>
            <h1 className="text-2xl font-[Nunito] font-bold mb-4">Reset your password</h1>
            <h2 className="text-lg font-[Nunito] font-bold mb-2">Verify</h2>
            <p className="text-gray-900 whitespace-nowrap">
              Your code was sent to you via phone number.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={otp[i]}
                className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2"
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[i] = el)}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              disabled={!isOtpComplete}
              className={`w-[350px] py-3 text-white font-[Nunito] font-bold rounded-md transition ${
                isOtpComplete ? 'bg-[#B3DB48]' : 'bg-[#CEDEA5] cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodeForm;
