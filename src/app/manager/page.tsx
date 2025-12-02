import { redirect } from 'next/navigation';

// Halaman root dari /manager hanya berfungsi untuk redirect
// ke halaman login atau dashboard.
export default function ManagerRootPage() {
  // Logika ini bisa diperluas untuk memeriksa cookie sesi
  // Jika ada sesi -> redirect('/manager/dashboard')
  // Jika tidak -> redirect('/manager/login')
  
  redirect('/manager/login');
}
