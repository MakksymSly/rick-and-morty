'use client';

import { navigation } from '@/assets/constants/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

export const Header = () => {
	const pathname = usePathname();
	console.log(pathname);
	return (
		<div className="w-full flex bg-gray-800 shadow-xl items-center justify-between px-6">
			<Link href="/">
				<Image src="/logo-icon.png" alt="Logo" width={300} height={80} className="h-[80px]" />
			</Link>

			<div className="flex h-[80px] uppercase font-bold gap-6 text-slate-50">
				{navigation.map((tab) => {
					return (
						<Link href={tab.href} key={tab.name} className={cn('flex items-center h-full p-4 hover:bg-gray-700', { 'bg-gray-700': pathname === tab.href })}>
							{tab.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
};
