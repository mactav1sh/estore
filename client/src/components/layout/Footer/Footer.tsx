/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import ContentWrapper from '../../elements/ContentWrapper';

const Footer = () => {
  const companyList = ['About us', 'Blog', 'Partnerships', 'Careers'];
  const additionalList = [
    'F.A.Q',
    'Cookies Policy',
    'Terms Of Service',
    'Support',
  ];

  return (
    <footer className="w-full bg-slate-700 text-white">
      <a
        href="#"
        className="inline-block w-full bg-slate-600 py-1.5 text-center text-xs font-semibold capitalize duration-200 hover:bg-[#5A697D]"
      >
        back to top
      </a>
      <ContentWrapper>
        <div className="flex flex-col items-center  space-y-6 border-b border-b-slate-600 py-5 md:flex-row md:justify-around md:space-y-0 md:space-x-2">
          <div className="text-center md:flex-[2] md:text-left">
            <Link to="/" className="font-logo text-lg font-semibold uppercase">
              estore
            </Link>
            <p className="max-w-xs text-sm text-slate-200">
              Estore is an online store for all your technological needs.
            </p>
            <p className="mt-3 text-xs tracking-wide text-slate-300">
              EST. 2023
            </p>
          </div>
          <FooterList items={companyList} title="Company" />
          <FooterList items={additionalList} title="Additional Links" />
        </div>
        <div className="flex w-full justify-center py-3">
          <p className="text-xs text-slate-400">
            &copy; 2023 Estore. All Rights Reserved | Created by{' '}
            <a
              className="font-semibold tracking-wide text-slate-300 duration-300 hover:text-brand-pink-500"
              target="_blank"
              href="https://github.com/toukhyy"
              rel="noreferrer"
            >
              Toukhy
            </a>
          </p>
        </div>
      </ContentWrapper>
    </footer>
  );
};

function FooterList({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="w-full flex-[1] text-center md:text-left">
      <p className="mb-1 font-semibold">{title}</p>
      <ul>
        {items?.map((item, i) => (
          <li key={i} className="text-sm font-thin text-slate-200">
            <a href="/">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
