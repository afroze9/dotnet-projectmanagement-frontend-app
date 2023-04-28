import { Button, Container, Flex, Heading, IconButton, Spacer, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@hope-ui/solid";
import { Component, For, createResource, createSignal } from "solid-js";
import { ColumnDef, createSolidTable, flexRender, getCoreRowModel } from "@tanstack/solid-table";
import { CompanyResponse, CompanySummaryResponseModel } from "../../@types";
import { Link } from "@solidjs/router";
import { IconEdit, IconDelete } from "../../components/Icons";
import { Protected, useAuth0 } from "@afroze9/solid-auth0";
import { getCompanies } from "../../api/company/CompanyApi";
import { isErrorReponse } from "../../api/ErrorResponse";


const Companies: Component = () => {
  const auth0 = useAuth0();

  const getCompanyList = async (): Promise<CompanySummaryResponseModel[]> => {
    const list = await getCompanies(await auth0.getToken());
    if (!isErrorReponse(list)) {
      return list as CompanySummaryResponseModel[];
    }
    return [];
  }

  const [clist] = createResource(getCompanyList);

  const defaultColumns: ColumnDef<CompanySummaryResponseModel>[] = [
    {
      accessorKey: 'name',
      cell: info => <Td>{info.getValue<string>()}</Td>,
      footer: info => info.column.id,
    },
    {
      accessorKey: 'projectCount',
      cell: info => <Td>{info.getValue<number>()}</Td>,
      footer: info => info.column.id,
    },
    {
      id: 'actions',
      cell: info => renderActions(info.row.original.id),
      footer: info => info.column.id
    }
  ]

  const onDeleteClicked = (id: number) => {
    console.log(id);
  }

  const renderActions = (id: number) => {
    const editUrl = `/companies/${id}/details`;
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

  const table = createSolidTable<CompanySummaryResponseModel>({
    get data() {
      return clist() ?? []
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Container p="$2">
      <Flex>
        <Heading size="xl">
          Companies
        </Heading>
        <Spacer />
        <Button as={Link} href='/companies/create' >Add Company</Button>
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
    <Companies />
  </Protected>
)
