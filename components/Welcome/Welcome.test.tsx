import { render, screen } from '@/test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct link', () => {
    render(<Welcome />);
    expect(screen.getByText('Google')).toHaveAttribute(
      'href',
      'https://google.com/',
    );
  });
});
