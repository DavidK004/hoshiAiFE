import type { OnlyChildrenProps } from './types/OnlyChildrenProps'
import { StyledContainer } from './Container.styles';

const Container = ({ children }: OnlyChildrenProps) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;