// src/emails/OtpEmail.jsx
import {
  Html,
  Tailwind,
  Body,
  Container,
  Section,
} from "@react-email/components";

export default function OtpEmailTemplate({ message }) {
  return (
    <Html lang='fa' dir='rtl'>
      <Tailwind>
        <Body className=' font-sans'>
          <Container className='max-w-md mx-auto  rounded-2xl shadow-lg overflow-hidden mt-8'>
            <Section className='text-center py-8'>
              <img
                src='https://res.cloudinary.com/dvb6lgat3/image/upload/v1759657219/cluohgtrgb44wbhob7e1.png'
                alt='لوگو'
                className='mx-auto w-20 h-20 p-2 rounded-full mb-4'
              />
            </Section>

            <Section className='p-8 text-right'>
              <div className='border border-ketab-green/30 rounded-xl bg-ketab-green/30 p-4 text-center text-4xl font-semibold text-green-700'>
                {message}
              </div>

              <p className='text-ketab-gray text-sm mt-4 leading-relaxed'>
                کد تایید شما بعد از ۱ دقیقه منقضی می‌شود
              </p>

              <div className='mt-6 border border-ketab-red/30 bg-ketab-red/10 rounded-xl p-4'>
                <h3 className='text-ketab-orange text-base font-semibold mb-2'>
                  💡 نکته مهم
                </h3>
                <p className='text-ketab-orange text-sm'>
                  در صورت وجود هرگونه سوال، از طریق راه‌های ارتباطی با ما در
                  تماس باشید.
                </p>
              </div>
            </Section>

            <Section className=' text-center text-sm text-ketab-gray py-4 border-t border-ketab-gray/30'>
              <p className='font-semibold text-ketab-green'>
                با سپاس از اعتماد شما 💚
              </p>
              <p>
                این ایمیل به صورت خودکار ارسال شده است، لطفاً پاسخ ندهید.
                <br />© {new Date().getFullYear()} تمامی حقوق محفوظ است.
              </p>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
