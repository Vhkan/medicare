import PatientForm from "@/components/forms/PatientForm";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* Add OTP varification |passkey modal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src='/assets/icons/medicare-high-resolution-logo-transparent.png'
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit" />
          <PatientForm />
          <div className="text-1-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 MediCare</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
