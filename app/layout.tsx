import { Providers } from '@/components/Providers';
import { Open_Sans } from 'next/font/google';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata = {
	title: 'Tasks App',
	description: 'Aplicación para el manejo de tareas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className} suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
