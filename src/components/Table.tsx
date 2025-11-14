import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function createData(
    idcolor: string,
    tipo: string,
    base: string,
    calidad: string,
    cantidad: string
) {
    return {
        idcolor,
        tipo,
        base,
        calidad,
        cantidad,
        history: [
            {
                date: '2020-01-05',
            },
        ],
    }
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    '&:hover': { backgroundColor: '#fff5f5' }, // suave fondo rojo claro
                }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon className="text-red-600" />
                        ) : (
                            <KeyboardArrowDownIcon className="text-red-600" />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" className="font-semibold text-gray-800">
                    {row.idcolor}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                    {row.tipo}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                    {row.base}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                    {row.calidad}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                    {row.cantidad}
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const rows = [
    createData('EZ 9057', 'Satinado', 'Base BP', 'Permalatex', '1 L'),
    createData('EZ 9077', 'Mate', 'Base EB', 'LVA', '1 G'),
]

export default function CollapsibleTable() {
    return (
        <div className="bg-white border border-red-600 rounded-xl shadow-md flex w-full max-w-5xl overflow-hidden">
            {/* Franja lateral roja */}
            <div className="bg-red-600 w-2 rounded-r-[2rem]"></div>

            <div className="flex flex-col p-6 w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Lista — Colores de Persona 
                </h2>

                <TableContainer
                    component={Paper}
                    className="shadow-none border border-gray-200 rounded-xl"
                >
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow className="bg-red-600">
                                <TableCell colSpan={6}>
                                    <span className="text-white font-semibold">
                                        0150266385
                                    </span>
                                </TableCell>
                            </TableRow>

                            <TableRow className="bg-red-50">
                                <TableCell />
                                <TableCell className="font-semibold text-gray-800">
                                    COD.COLOR
                                </TableCell>
                                <TableCell align="right" className="font-semibold text-gray-800">
                                    TIPO
                                </TableCell>
                                <TableCell align="right" className="font-semibold text-gray-800">
                                    BASE
                                </TableCell>
                                <TableCell align="right" className="font-semibold text-gray-800">
                                    CALIDAD
                                </TableCell>
                                <TableCell align="right" className="font-semibold text-gray-800">
                                    CANTIDAD
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.idcolor} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
