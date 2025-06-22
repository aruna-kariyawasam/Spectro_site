// Secure configuration for admin access control
// In a production environment, this would be stored in environment variables or a secure database

export const APPROVED_ADMIN_STUDENT_IDS = ["EC/2020/012", "EC/2020/056"] as const

export type ApprovedAdminStudentId = (typeof APPROVED_ADMIN_STUDENT_IDS)[number]

/**
 * Validates if a student ID is approved for admin access
 * @param studentId - The student ID to validate
 * @returns boolean indicating if the student ID is approved for admin access
 */
export function isApprovedAdminStudentId(studentId: string | undefined): boolean {
  if (!studentId) return false

  // Normalize the student ID (remove extra spaces, convert to uppercase)
  const normalizedStudentId = studentId.trim().toUpperCase()

  return APPROVED_ADMIN_STUDENT_IDS.some((approvedId) => approvedId.toUpperCase() === normalizedStudentId)
}

/**
 * Validates student ID format (EC/YYYY/XXX)
 * @param studentId - The student ID to validate
 * @returns boolean indicating if the format is valid
 */
export function isValidStudentIdFormat(studentId: string): boolean {
  const studentIdPattern = /^EC\/\d{4}\/\d{3}$/
  return studentIdPattern.test(studentId.trim())
}
