import { Paper } from '@mui/material'
import React from 'react'
import ListTitle from '../ListTitle'

export default function ToDo() {
    return (
        <>
            <Paper elevation={2}>
                <ListTitle title="ToDo" />
                {/* 
                {card}
                <Inputplace onAddoredit={this.onAddoredit} /> */}
            </Paper>
        </>
    )
}
