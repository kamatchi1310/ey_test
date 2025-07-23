import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { TableProps } from "../Types/types";
import { useNavigate } from "react-router-dom";

const CharacterTable: React.FC<TableProps> = ({ characters }) => {
  const navigate = useNavigate();

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };

  const data = useMemo(() => characters, [characters]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "S.No",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Image",
        cell: ({ row }) => (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Species",
        accessorKey: "species",
      },
      {
        header: "Type",
        cell: ({ row }) => row.original.type || "-",
      },
      {
        header: "Gender",
        accessorKey: "gender",
      },
      {
        header: "Origin",
        cell: ({ row }) => row.original.origin.name,
      },
      {
        header: "Location",
        cell: ({ row }) => row.original.location.name,
      },
      {
        header: "Episodes",
        cell: ({ row }) => row.original.episode.length,
      },
      {
        header: "Created",
        cell: ({ row }) => formatDate(row.original.created),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className="table-wrapper"
      style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
    >
      <table
        className="table table-bordered table-hover align-middle"
        style={{ borderColor: "#343a40", minWidth: "1200px" }}
      >
        <thead
          className="table-dark"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-center">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="text-center pointer"
              onClick={() => navigate(`/details/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
