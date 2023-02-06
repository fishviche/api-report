const xl = require('excel4node');
const { pool } = require('../database/database.js');
const excelService = {}

const createExcel = (name, buildings, poblation, cantidad_reportes, cantidad_limpieza, cantidad_delincuencia, promedio) => {
  const wb = new xl.Workbook();
  const ws1 = wb.addWorksheet(`Distrito ${name}`);
  const data_values = ['Extensión', 'Población', 'Tasa de natalidad',
    'Tasa de mortalidad', 'Nivel de educación', 'Nivel de riqueza',
    'Calidad de comida', 'Escuelas', 'Municipalidades',
    'Hospitales', 'Librerías'
  ]
  const data_keys = ['extension', 'population', 'birth_rate',
    'death_rate', 'level_education', 'level_of_wealth',
    'quality_of_food', 'schools', 'city_hall',
    'hospitals', 'libraries'
  ]
  const data_years = ['2017', '2018', '2019', '2020', '2021', '2022']
  ws1.cell(1, 1).string('Año');
  ws1.cell(1, 2).string('Tipo de dato');
  ws1.cell(1, 3).string('Valor');
  let first_row = 2;
  // Data of district
  for (let i = 0; i < data_years.length; i++) {
    ws1.cell(first_row, 1).string(data_years[i]);
    for (let j = 0; j < data_values.length; j++) {
      let row_for_value = first_row + j
      ws1.cell(row_for_value, 2).string(data_values[j]);
      if (j < 6){
        ws1.cell(row_for_value, 3).string(String(buildings[i][data_years[i]][data_keys[j]]));
      } else {
        ws1.cell(row_for_value, 3).string(String(poblation[i][data_years[i]][data_keys[j]]));
      }
    }
    first_row += data_values.length;
  }
  // Data of report by district
  ws1.cell(1, 5).string('Data');
  ws1.cell(2, 5).string('Cantidad de denuncias');
  ws1.cell(3, 5).string('Cantidad de denuncia por limpieza');
  ws1.cell(4, 5).string('Cantidad de denuncia por delincuencia');
  ws1.cell(5, 5).string('Promedio');
  ws1.cell(1, 6).string('Valor');
  ws1.cell(2, 6).string(String(cantidad_reportes));
  ws1.cell(3, 6).string(String(cantidad_limpieza));
  ws1.cell(4, 6).string(String(cantidad_delincuencia));
  ws1.cell(5, 6).string(String(promedio));
  wb.write('Excel.xlsx');
}

excelService.createReporte = async (district_id) => {
  
  const response = await pool.query(`
    SELECT *
    FROM district
    WHERE district_id = $1
    `, [district_id]);
  const reportByDistrict = await pool.query(`
  SELECT COUNT(*) AS cantidad_reportes
  FROM report
  WHERE district_id = $1
  `, [district_id]);
  const reportByDistrictandCategoryOne = await pool.query(`
  SELECT COUNT(*)  AS cantidad_limpieza
  FROM report
  WHERE district_id = $1
  AND category_id = 1;
  `, [district_id]);
  const reportByDistrictandCategoryTwo = await pool.query(`
  SELECT COUNT(*)  AS cantidad_delincuencia
  FROM report
  WHERE district_id = $1
  AND category_id = 2;
  `, [district_id]);
  const averageScoreByDistrict = await pool.query(`
  SELECT AVG(score) AS promedio
  FROM report
  WHERE district_id = $1
  `, [district_id]);
  createExcel(
    response.rows[0].name,
    response.rows[0].buildings,
    response.rows[0].poblation,
    reportByDistrict.rows[0].cantidad_reportes,
    reportByDistrictandCategoryOne.rows[0].cantidad_limpieza,
    reportByDistrictandCategoryTwo.rows[0].cantidad_delincuencia,
    averageScoreByDistrict.rows[0].promedio
    );

  
  return response
}
// Create a new instance of a Workbook class
// 

// // Add Worksheets to the workbook
// const ws = wb.addWorksheet('Sheet 1');
// const ws2 = wb.addWorksheet('Sheet 2');
// // Set value of cell B1 to 200 as a number type styled with paramaters of style
// ws.cell(1, 2)
//   .number(200)

// // Set value of cell C1 to a formula styled with paramaters of style
// ws.cell(1, 3)
//   .formula('A1 + B1')

// // Set value of cell A2 to 'string' styled with paramaters of style
// ws.cell(2, 1)
//   .string('string')

// // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
// ws.cell(3, 1)
//   .bool(true)
//   ws.row(1).filter();

// wb.write('Excel.xlsx');

module.exports = excelService;