import LinkedInIcon from '../assets/linkedin.svg';
import GitHubIcon from '../assets/GitHub_logo.png';
import CodeWarsIcon from '../assets/codeWarsLogo.png';
import '../index.css';

const Footer = (): JSX.Element => {
    return (
        <>
            <div className="flex flex-row justify-center mb-10 mt-24 brownFont quattroFont">
                <div className='grid grid-cols-3'>
                    <div className="justify-end">Designed and Developed by Pedro Castaneda</div>
                    <div className='grid justify-items-center'>| Portfolio |</div>
                    <div className='flex flex-row justify-start gap-3'>
                        <img className='w-5 h-auto' src={LinkedInIcon} alt="linkedin icon" />
                        <img className='w-5 h-auto' src={GitHubIcon} alt="github icon" />
                        <img className='w-5 h-auto' src={CodeWarsIcon} alt="codewars icon" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;