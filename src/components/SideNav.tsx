import { Component, For } from 'solid-js';
import { Center, Flex, VStack } from '@hope-ui/solid';
import { ApplicationLinks, CONSTANTS } from '../constants';
import { Hyperlink } from '../constants';
import { SideNavLink } from './SideNavLink';

export interface SideNavLinkProps {
  link: Hyperlink;
}

export const SideNav: Component = () => {
  return (
    <Flex direction="column" bg="$accent10" style={{ width: "250px" }}> {/* top to bottom */}
      <VStack>
        <For each={ApplicationLinks}>
          {(link, i) =>
            <SideNavLink link={link} />
          }
        </For>
      </VStack>
    </Flex>
  );
};
