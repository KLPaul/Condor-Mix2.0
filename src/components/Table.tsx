import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Client } from '../models/client'
import { useEffect, useState } from 'react'
import { api } from '../services/ApiService'
import type { ColorList } from '../models/colorList'


interface Props {
    client?: Client
}


function Row(props: { row: ColorList }) {
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

                <TableCell component="th" scope="row" className="font-semibold text-gray-800">
                    {row.colorCod + " " + row.colorName}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                    {row.tipo}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                    {row.baseName}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                    {row.marca}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                    {row.cantidad}
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}



export default function CollapsibleTable({ client }: Props) {

    const [listColor, setListColor] = useState<ColorList[]>([])

    useEffect(() => {

        if (client?.id !== 0 && client !== undefined) {
            const addColors = async () => {
                const response = await api.getSearchPathVariable<ColorList[]>("api/percolor/getColors/", client!.id)
                setListColor(response)
            }
            addColors()
        }

    }, [client])

    return (client?.id !== 0 && client !== undefined &&
        (<div className="bg-white border border-red-600 rounded-xl shadow-md flex w-full max-w-5xl overflow-hidden">
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
                                        {client?.cedula + " " + client?.nombre}
                                    </span>
                                </TableCell>
                            </TableRow>

                            <TableRow className="bg-red-50">

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
                            {listColor.map((row) => (
                                <Row key={row.colorCod} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>)
    )
}
