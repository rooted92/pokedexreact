import LinkedInIcon from '../assets/linkedin.svg';
import GitHubIcon from '../assets/GitHub_logo.png';
import CodeWarsIcon from '../assets/nav_codewars.svg';
import '../index.css';

const Footer = (): JSX.Element => {
    return (
        <>
            <div className="container mx-auto mb-4 mt-20 grid grid-cols-1 sm:flex sm:space-x-3 brownFont quattroFont sm:justify-center">
                <div className='text-center'>Designed and Developed by Pedro Castaneda</div>
                <div className='text-center'>|<span className='mx-2'><a href="https://pedroc.dev/">Portfolio</a></span>|</div>
                <div className='flex flex-row justify-center sm:justify-start gap-3'>
                    <a className='hover:scale-125' href="https://www.linkedin.com/in/pedro-castaneda-developer/">
                        <img className='w-auto h-5' src={LinkedInIcon} alt="linkedin icon" />
                    </a>
                    <a className='hover:scale-125' href="https://github.com/rooted92">
                        <img className='w-auto h-5' src={GitHubIcon} alt="github icon" />
                    </a>
                    <a className='hover:scale-125' href="https://www.codewars.com/users/rooted92">
                        <img className='w-auto h-5' src={CodeWarsIcon} alt="codewars icon" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default Footer;