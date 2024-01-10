
export const createFolderName = (names, lastnames, empleado_id) => {

  const formattedNames = names.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '_');
  const formattedLastnames = lastnames.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '_');

  const dirName = `${formattedNames}_${formattedLastnames}_${empleado_id}`;

  return dirName;

}
