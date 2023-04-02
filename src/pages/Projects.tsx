import { Td, Container, Heading, Table, Thead, Tr, Th, Tbody } from "@hope-ui/solid";
import { ColumnDef, createSolidTable, getCoreRowModel, flexRender } from "@tanstack/solid-table";
import { Component, For, createSignal } from "solid-js";

type ProjectResponse = {
  id: number;
  name: string;
  company: string;
  tasks: number;
}

const defaultData: ProjectResponse[] = [
  {
    id: 1,
    name: 'Project A',
    company: 'Acme Inc.',
    tasks: 15
  },
  {
    id: 2,
    name: 'Project B',
    company: 'Globex Corporation',
    tasks: 20
  },
  {
    id: 3,
    name: 'Project C',
    company: 'Initech',
    tasks: 10
  },
  {
    id: 4,
    name: 'Project D',
    company: 'Umbrella Corporation',
    tasks: 25
  },
  {
    id: 5,
    name: 'Project E',
    company: 'Stark Industries',
    tasks: 30
  },
  {
    id: 6,
    name: 'Project F',
    company: 'Wayne Enterprises',
    tasks: 12
  },
  {
    id: 7,
    name: 'Project G',
    company: 'Oscorp Industries',
    tasks: 18
  },
  {
    id: 8,
    name: 'Project H',
    company: 'S.H.I.E.L.D.',
    tasks: 8
  },
  {
    id: 9,
    name: 'Project I',
    company: 'Weyland-Yutani Corporation',
    tasks: 22
  },
  {
    id: 10,
    name: 'Project J',
    company: 'Cyberdyne Systems Corporation',
    tasks: 5
  }
]

const defaultColumns: ColumnDef<ProjectResponse>[] = [
  {
    accessorKey: 'name',
    cell: info => <Td>{info.getValue<string>()}</Td>,
    footer: info => info.column.id,
  },
  {
    accessorKey: 'company',
    cell: info => <Td>{info.getValue<string>()}</Td>,
    footer: info => info.column.id,
  },
  {
    accessorKey: 'tasks',
    cell: info => <Td>{info.getValue<number>()}</Td>,
    footer: info => info.column.id,
  }
]

const tasks: Component = () => {
  const [data, setData] = createSignal(defaultData);

  const table = createSolidTable<ProjectResponse>({
    get data() {
      return data()
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Container p="$2">
      <Heading size="xl">
        Projects
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

export default tasks;
