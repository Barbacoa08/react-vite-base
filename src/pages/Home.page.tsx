import { useCallback, useMemo, useState } from 'react';
// core styles are required for all packages
import {
  Badge,
  Container,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text
} from '@mantine/core';
import '@mantine/core/styles.css';

/** Types: */
type Dimensions = [number, number];

type Space = {
  clickCount: number;
};

type CheckerBoard = {
  rows: Space[][];
  dimensions: Dimensions;
};

/** Constants */

const GAME_SIZE = '80vw';

const DEFAULT_DIMENSIONS: Dimensions = [8, 8];

/** Utility functions */
function buildBoard(
  dimensions: Dimensions = DEFAULT_DIMENSIONS,
  boardToMerge?: CheckerBoard
): CheckerBoard {
  const [x, y] = dimensions;
  const rows: Space[][] = Array.from(Array(y).keys()).map((_, rowIndex) =>
    Array.from(Array(x).keys()).map(
      (_, columnIndex) =>
        ({
          clickCount:
            boardToMerge?.rows?.[rowIndex]?.[columnIndex]?.clickCount ?? 0
        } satisfies Space)
    )
  );
  return {
    dimensions,
    rows
  };
}

function getSquareSize(dimensions: Dimensions) {
  // use whichever dimension is highest so the board always stays within the view
  return `calc(${GAME_SIZE} / ${Math.max(...dimensions)})`;
}

function determineSpaceColor({
  rowIndex,
  spaceIndex
}: {
  rowIndex: number;
  spaceIndex: number;
}) {
  return (rowIndex + spaceIndex) % 2 ? 'black' : 'red';
}

function incrementBoardSpaceClickCount({
  board,
  rowIndex,
  spaceIndex
}: {
  board: CheckerBoard;
  spaceIndex: number;
  rowIndex: number;
}): CheckerBoard {
  const updatedBoard = { ...board };

  updatedBoard.rows[rowIndex][spaceIndex]['clickCount'] =
    updatedBoard.rows[rowIndex][spaceIndex]['clickCount'] + 1;

  return updatedBoard;
}

function getHighestClick(board: CheckerBoard) {
  return board.rows.reduce<number>(
    (max, row) => Math.max(Math.max(...row.map(r => r.clickCount)), max),
    0
  );
}

/** UI COMPONENTS */
function BoardRow({
  row,
  rowIndex,
  onSpaceClick,
  dimensions
}: {
  row: Space[];
  rowIndex: number;
  onSpaceClick: (props: { spaceIndex: number }) => void;
  dimensions: Dimensions;
}) {
  return (
    <Group gap={0} wrap='nowrap'>
      {row.map((space, spaceIndex) => (
        <Paper
          component={Stack}
          align='center'
          justify='center'
          radius={0}
          onClick={() => {
            onSpaceClick({ spaceIndex });
          }}
          bg={determineSpaceColor({ rowIndex, spaceIndex })}
          h={getSquareSize(dimensions)}
          w={getSquareSize(dimensions)}>
          <Text c={'white'}>{space.clickCount}</Text>
        </Paper>
      ))}
    </Group>
  );
}

export const HomePage = () => {
  const [[rowSize, columnSize], setBoardDimensions] =
    useState<Dimensions>(DEFAULT_DIMENSIONS);

  const [board, setBoard] = useState<CheckerBoard>(buildBoard);

  const highestClick = useMemo(() => getHighestClick(board), [board]);

  const handleDimensionChange = useCallback(
    (dimensions: Dimensions) => {
      setBoardDimensions(dimensions);

      const newBoard = buildBoard(dimensions, board);

      setBoard(newBoard);
    },
    [board]
  );

  return (
    <Stack bg={'gray.0'} p={'md'} align='center'>
      <Stack maw={GAME_SIZE} w={GAME_SIZE} align='center'>
        <Group align='center'>
          <NumberInput
            label={'Row Size'}
            value={rowSize}
            onChange={v => {
              const newDimensions = [
                v as number,
                columnSize
              ] satisfies Dimensions;
              handleDimensionChange(newDimensions);
            }}
          />
          <NumberInput
            label={'Column Size'}
            value={columnSize}
            onChange={v => {
              const newDimensions = [rowSize, v as number] satisfies Dimensions;
              handleDimensionChange(newDimensions);
            }}
          />
          <Group>
            Highest Clicks
            <Badge size='xl'>{highestClick}</Badge>
          </Group>
        </Group>
        <Stack gap={0}>
          {board.rows.map((row, rowIndex) => {
            return (
              <BoardRow
                dimensions={board.dimensions}
                onSpaceClick={({ spaceIndex }) => {
                  setBoard(
                    incrementBoardSpaceClickCount({
                      board,
                      spaceIndex,
                      rowIndex
                    })
                  );
                }}
                row={row}
                rowIndex={rowIndex}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
