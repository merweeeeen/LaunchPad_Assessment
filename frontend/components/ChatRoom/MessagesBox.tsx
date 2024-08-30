import { Stack, Button, Group } from '@mantine/core';

export function MessageBox() {
  const demoProps = {
    bg: 'var(--mantine-color-white)',
    h: 500,
    mt: 'xl',
  };

  return (
    <>
      <Stack h={300} bg="var(--mantine-color-body)" align="stretch" justify="center" gap="md">
        <Group justify="right" >
          <Button variant="default">1</Button>
        </Group>
        <Button variant="default">2</Button>
        <Button variant="default">3</Button>
      </Stack>
    </>
  );
}
