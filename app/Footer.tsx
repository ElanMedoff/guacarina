import {
  AiOutlineMail as MailIcon,
  AiOutlineGithub as GithubIcon,
  AiOutlineLinkedin as LinkedinIcon,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 text-xs border-t-neutral border-t-2 bg-base-200 gap-6">
      <span>© guacarina.com</span>
      <div className="flex gap-3">
        <a href="https://github.com/ElanMedoff/guacarina">
          <GithubIcon size={25} />
        </a>
        <a href="https://www.linkedin.com/in/elan-medoff/">
          <LinkedinIcon size={25} />
        </a>
        <a href="mailto:info@guacarina.com">
          <MailIcon size={25} />
        </a>
      </div>
    </footer>
  );
}
