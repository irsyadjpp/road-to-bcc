import { redirect } from 'next/navigation';

export default function DeprecatedRegistrationPage() {
  // Halaman ini tidak lagi digunakan dan akan mengarahkan
  // pengguna ke alur pendaftaran manajer yang baru.
  redirect('/manager/login');
}
