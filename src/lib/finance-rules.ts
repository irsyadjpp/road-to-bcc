import { SystemRole } from "@/lib/schemas/finance";

/**
 * Menentukan siapa SIGNER yang valid untuk mencegah konflik kepentingan.
 * Mengimplementasikan aturan "Cross-Authorization".
 */
export function getRequiredSigner(requesterRole: SystemRole): SystemRole {
  // ATURAN 1: Jika yang minta PROJECT DIRECTOR (misal untuk IT), 
  // maka yang harus ACC adalah SEKRETARIS.
  if (requesterRole === SystemRole.PROJECT_DIRECTOR) {
    return SystemRole.SECRETARY;
  }

  // ATURAN 2: Jika yang minta SEKRETARIS (misal untuk Acara),
  // maka yang harus ACC adalah PROJECT DIRECTOR.
  if (requesterRole === SystemRole.SECRETARY) {
    return SystemRole.PROJECT_DIRECTOR;
  }

  // ATURAN 3: Default (Divisi lain), yang ACC adalah PROJECT DIRECTOR.
  return SystemRole.PROJECT_DIRECTOR;
}

/**
 * Cek apakah User yang sedang login berhak melakukan Approval
 */
export function canUserApprove(
  currentUserRole: SystemRole, 
  requesterRole: SystemRole
): boolean {
  const requiredSigner = getRequiredSigner(requesterRole);
  return currentUserRole === requiredSigner;
}
