import React from 'react';
import {ICustomerRow} from '../App';
import PieChart from 'react-minimal-pie-chart';


interface IChartProps {
    data: ICustomerRow[];
}

const colors = [
    '#d8ff76',
    '#ff76d8',
    '#ff8b76',
    '#76ffc4'
];

const formatData = (data: ICustomerRow[]) => {
    let res: any[] = [];
    let temp: any = {};
    for (let row of data) {
        if (temp[row.device]) {
            temp[row.device]++;
        } else {
            temp[row.device] = 1;
        }
    }
    let i = 0;
    for (let dev in temp) {
        if (i >= colors.length) {
            i = 0;
        }
        res.push({title: dev, value: temp[dev], color: colors[i++]});
    }
    return res;
}

export function CustomerGraph(props: IChartProps) {
    const data = formatData(props.data);

    return (
        <PieChart
            data={data}
        />
    );
};
export default CustomerGraph;