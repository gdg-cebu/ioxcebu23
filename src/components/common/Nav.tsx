import { useRouter } from 'next/router';
import Link from 'next/link';

import type * as React from 'react';
import type * as types from 'types';

export type Props = { links: types.Link[] } & types.StackbitAnnotation;

const Nav: React.FC<Props> = ({ links, sb }) => {
  const { asPath } = useRouter();
  const getActiveClass = (url: string) =>
    url === asPath ? 'bg-primary-faded text-primary' : 'hover:bg-complementary-faded focus:bg-complementary-faded';

  return (
    <>
      <nav className="-mx-1" data-sb-field-path={sb}>
        {links.map((link, index) => (
          <span className="inline-block mx-1" key={index} data-sb-field-path={`.[${index}]`}>
            <Link href={link.url} passHref>
              <a
                className={`inline-block py-2 px-4 rounded ${getActiveClass(link.url)}`}
                data-sb-field-path=".label .url#@href"
              >
                {link.label}
              </a>
            </Link>
          </span>
        ))}
      </nav>
    </>
  );
};

export default Nav;
