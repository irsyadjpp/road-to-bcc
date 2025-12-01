import Link from 'next/link'
import { Button } from '@/components/ui/button'
 
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center p-4">
      <h1 className="text-9xl font-black text-primary/20">404</h1>
      <h2 className="text-2xl font-bold font-headline -mt-12 mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Mungkin bolanya keluar garis (Out)? Halaman yang Anda cari tidak tersedia.
      </p>
      <Button asChild>
        <Link href="/">Kembali ke Lapangan (Home)</Link>
      </Button>
    </div>
  )
}
