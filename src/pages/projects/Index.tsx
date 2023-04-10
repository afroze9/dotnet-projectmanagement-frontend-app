import { Td, Container, Heading, Table, Thead, Tr, Th, Tbody, Button, Flex, Spacer, IconButton, Icon } from "@hope-ui/solid";
import { ColumnDef, createSolidTable, getCoreRowModel, flexRender } from "@tanstack/solid-table";
import { Component, For, createResource, createSignal } from "solid-js";
import { ProjectResponse } from "../../@types";
import { Protected, useAuth0 } from "@afroze9/solid-auth0";
import { Link } from "@solidjs/router";
import { IconDelete, IconEdit } from "../../components/Icons";
import { getProjects } from "../../api/project/ProjectApi";
import { isErrorReponse } from "../../api/ErrorResponse";

const Projects: Component = () => {
  const auth0 = useAuth0();

  const getProjectList = async (): Promise<ProjectResponse[]> => {
    const list = await getProjects(await auth0.getToken());
    if (!isErrorReponse(list)) {
      return list as ProjectResponse[];
    }
    return [];
  }

  const [plist] = createResource(getProjectList);

  const defaultColumns: ColumnDef<ProjectResponse>[] = [
    {
      accessorKey: 'name',
      cell: info => <Td>{info.getValue<string>()}</Td>,
      footer: info => info.column.id,
    },
    {
      accessorKey: 'tasks',
      cell: info => <Td>{info.getValue<number>()}</Td>,
      footer: info => info.column.id,
    },
    {
      id: 'actions',
      cell: info => renderActions(info.row.original.id),
      footer: info => info.column.id
    }
  ];

  const onDeleteClicked = (id: number) => {
    console.log(id);
  }

  const renderActions = (id: number) => {
    const editUrl = `/projects/${id}/details`;
    return (
      <Flex>
        <IconButton aria-label="edit" icon={<IconEdit />} as={Link} href={editUrl}>Edit</IconButton>
        <IconButton
          css={{
            background: "$danger10",
            marginLeft: "$2",
            _hover: {
              background: "$danger11"
            }
          }}
          aria-label="delete" icon={<IconDelete />} onClick={() => onDeleteClicked(id)}>Edit</IconButton>
      </Flex>
    )
  }

  const table = createSolidTable<ProjectResponse>({
    get data() {
      return plist() ?? []
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Container p="$2">
      <Flex>
        <Heading size="xl">
          Projects
        </Heading>
        <Spacer />
        <Button as={Link} href='/projects/create'>Add Project</Button>
      </Flex>
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

export default () => (
  <Protected onRedirecting={<>Loading</>}>
    <Projects />
  </Protected>
)
