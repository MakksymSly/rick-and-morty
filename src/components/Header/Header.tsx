/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { navigation } from '@/assets/constants/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

export const Header = () => {
	const pathname = usePathname();
	console.log(pathname);
	return (
		<div className="w-full flex bg-gray-800 shadow-xl items-center justify-between px-6">
			<a href="/">
				<Image src="/logo-icon.png" alt="Logo" width={300} height={80} className="h-[80px]" />
			</a>

			<div className="flex h-[80px] uppercase font-bold gap-6 text-slate-50">
				{navigation.map((tab) => {
					return (
						<a href={tab.href} key={tab.name} className={cn('flex items-center h-full p-4 hover:bg-gray-700', { 'bg-gray-700': pathname === tab.href })}>
							{tab.name}
						</a>
					);
				})}
			</div>
		</div>
	);
};
