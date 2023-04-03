import { Container, Heading, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@hope-ui/solid";
import { Component, For, createSignal } from "solid-js";
import { ColumnDef, createSolidTable, flexRender, getCoreRowModel } from "@tanstack/solid-table";
import { CompanyResponse } from "../@types";

const defaultData: CompanyResponse[] = [
  {
    id: 1,
    name: 'Acme Inc.',
    projects: 5
  },
  {
    id: 2,
    name: 'Globex Corporation',
    projects: 10
  },
  {
    id: 3,
    name: 'Initech',
    projects: 3
  },
  {
    id: 4,
    name: 'Umbrella Corporation',
    projects: 7
  },
  {
    id: 5,
    name: 'Stark Industries',
    projects: 15
  },
  {
    id: 6,
    name: 'Wayne Enterprises',
    projects: 12
  },
  {
    id: 7,
    name: 'Oscorp Industries',
    projects: 8
  },
  {
    id: 8,
    name: 'S.H.I.E.L.D.',
    projects: 4
  },
  {
    id: 9,
    name: 'Weyland-Yutani Corporation',
    projects: 6
  },
  {
    id: 10,
    name: 'Cyberdyne Systems Corporation',
    projects: 2
  },
  {
    id: 11,
    name: 'Staples Inc.',
    projects: 1
  },
  {
    id: 12,
    name: 'Walmart Inc.',
    projects: 20
  },
  {
    id: 13,
    name: 'Target Corporation',
    projects: 14
  },
  {
    id: 14,
    name: 'Microsoft Corporation',
    projects: 18
  },
  {
    id: 15,
    name: 'Amazon.com, Inc.',
    projects: 22
  }
]

const defaultColumns: ColumnDef<CompanyResponse>[] = [
  {
    accessorKey: 'name',
    cell: info => <Td>{info.getValue<string>()}</Td>,
    footer: info => info.column.id,
  },
  {
    accessorKey: 'projects',
    cell: info => <Td>{info.getValue<number>()}</Td>,
    footer: info => info.column.id,
  }
]

const Companies: Component = () => {
  const [data, setData] = createSignal(defaultData);

  const table = createSolidTable<CompanyResponse>({
    get data() {
      return data()
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Container p="$2">
      <Heading size="xl">
        Companies
      </Heading>
      <Container mt="$4">
        <Table striped="odd" highlightOnHover>
          <Thead>
            <For each={table.getHeaderGroups()}>
              {headerGroup => (
                <Tr>
                  <For each={headerGroup.headers}>
                    {header => (
                      <Th>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </Th>
                    )}
                  </For>
                </Tr>
              )}
            </For>
          </Thead>
          <Tbody>
            <For each={table.getRowModel().rows}>
              {row => (
                <Tr>
                  <For each={row.getVisibleCells()}>
                    {cell => (
                      <td>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )}
                  </For>
                </Tr>
              )}
            </For>
          </Tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default Companies;
