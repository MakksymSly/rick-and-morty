/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { navigation } from '@/assets/constants/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

export const Header = () => {
	const pathname = usePathname();
	const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className={cn('w-full flex bg-gray-800 shadow-xl items-center px-6', { 'justify-between': isDesktop, 'justify-center': !isDesktop })}>
				<a href="/">
					<Image src="/logo-icon.png" alt="Logo" width={300} height={80} className="h-[80px] " />
				</a>

				<div className="flex h-[80px] uppercase font-bold gap-6 text-slate-50">
					{isDesktop &&
						navigation.map((tab) => (
							<a
								href={tab.href}
								key={tab.name}
								className={cn('flex items-center h-full p-4 hover:bg-gray-700', {
									'bg-gray-700': pathname === tab.href,
								})}>
								{tab.name}
							</a>
						))}
				</div>
			</div>

			{!isDesktop && (
				<div className="w-full flex flex-col bg-gray-800 shadow-xl px-6">
					<div onClick={toggleMenu} className="text-center text-white font-bold text-2xl cursor-pointer py-2">
						Menu<span>{isOpen ? ' ↑' : ' ↓'}</span>
					</div>
					<div
						className={cn('flex flex-col uppercase font-bold text-slate-50 overflow-hidden transition-all duration-700 ease-in-out', {
							'max-h-0': !isOpen,
							'max-h-96': isOpen,
						})}>
						{navigation.map((tab) => (
							<a
								href={tab.href}
								key={tab.name}
								className={cn('flex items-center h-full p-4 hover:bg-gray-700', {
									'bg-gray-700': pathname === tab.href,
								})}>
								{tab.name}
							</a>
						))}
					</div>
				</div>
			)}
		</>
	);
};
