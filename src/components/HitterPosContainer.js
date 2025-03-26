import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { CONSTANTS } from '../constants';

const PosTable = styled.table`
  margin: .75rem .8rem 0 .8rem;

  th {
    border-bottom: 1px solid #eeeeee;
    font-size: 11px;
  }
  border-bottom: 1px solid #dddddd;


  caption {
    text-align: left;
    font-size: 10px;
    font-weight: 600;
  }
`;

const PosLabel = styled.div`
  font-size: 9px;
  color: #777777;
  text-align: left;
`;


const NameCell = styled.div`
  width: 100px;
  font-size: 12px;
`;
const TeamCell = styled.div`
  width: 30px;
  font-size: 9px;
  text-align: left;
`;
const RunsCell = styled.div`
  font-size: 11px;
  width: 22px;
  text-align: center;
`;
const HitsCell = styled.div`
font-size: 11px;
width: 22px;
text-align: center;
`;
const HRCell = styled.div`
font-size: 11px;
text-align: center;
width: 22px;
`;
const RBICell = styled.div`
font-size: 11px;
text-align: center;
width: 22px;
`;
const SBCell = styled.div`
font-size: 11px;
width: 22px;
text-align: center;
`;
const TotalCell = styled.div`
font-size: 12px;
text-align: left;
width: 22px;
font-weight: 600;
`;

export const HitterPosContainer = ({hittersBlob, pos, roster}) => {
  if (!pos) {
    return null;
  }
  const thePosition = hittersBlob && hittersBlob[pos];
  const allPosition = thePosition ? Object.keys(thePosition).map((key) => thePosition[key]) : [];
  const rosterPosition = allPosition && allPosition.filter((player) => {
    return player.roster === roster;
  }).sort((a, b) => {
    var x = a.total;
    var y = b.total;
    return x > y ? -1 : x < y ? 1 : 0;
  });
  return (
    <PosTable>
      <thead>
        <tr>
          <th></th>
          <th><Link href={`/pos/${pos}`}><a><PosLabel>{pos}</PosLabel></a></Link></th>
          <th></th>
          <th>r</th>
          <th>h</th>
          <th>hr</th>
          <th>rbi</th>
          <th>sb</th>
          <th>total</th>
        </tr>
      </thead>
      <tbody>
      {rosterPosition && rosterPosition.map((player, index) => {
        let rowStyle = {};
        if (pos === 'OF') {
          if (index < 3) {
            rowStyle['backgroundColor'] = '#efefef';
            rowStyle['fontWeight'] = 400;
          }
          else {
            rowStyle['fontWeight'] = 300;
            rowStyle['color'] = '#777777';
          }
  
        }
        else {
          if (index === 0) {
            rowStyle['backgroundColor'] = '#efefef';
            rowStyle['fontWeight'] = 400;
          }
          else {
            rowStyle['fontWeight'] = 300;
            rowStyle['color'] = '#777777';
          }
        }
        if (player.status && player.status === 'prospect') {
          rowStyle['backgroundColor'] = '#eff1fc';          
        }        
        return (
          <tr style={rowStyle} key={index}>
            <td style={{fontSize: '9px', color: '#444444'}}>{index + 1}</td>
            <td><NameCell><a target="_new" href={player.newsLink}>{player.name}</a></NameCell></td>
            <td><TeamCell>{player.team}</TeamCell></td>
            <td><RunsCell>{player.runs}</RunsCell></td>
            <td><HitsCell>{player.hits}</HitsCell></td>
            <td><HRCell>{player.homeRuns}</HRCell></td>
            <td><RBICell>{player.rbi}</RBICell></td>
            <td><SBCell>{player.stolenBases}</SBCell></td>
            <td><TotalCell>{player.total}</TotalCell></td>
          </tr>
        );
      })}
      </tbody>
    </PosTable>
  );
};