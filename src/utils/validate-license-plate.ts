const LICENSE_PLATE_REGEX = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

export function validateLicensePlate(licensePlate: string) {
  const licensePlateInUppercase = licensePlate.toUpperCase()
  const matchResult = licensePlateInUppercase.match(LICENSE_PLATE_REGEX)

  if (!matchResult) return false

  return true
}
