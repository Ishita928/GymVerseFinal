import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import RightArrowIcon from '../media/right-arrow-png-gz9b00bbbt8krd2l.png';
import LeftArrowIcon from '../media/red-arrow-left-pointing-5.png';

const LeftArrow = () => {
  const { scrollPrev, isFirstItemVisible } = useContext(VisibilityContext);

  return (
    <Typography
      onClick={() => !isFirstItemVisible && scrollPrev()}
      className="left-arrow"
      style={{
        opacity: isFirstItemVisible ? 0.5 : 1,
        pointerEvents: isFirstItemVisible ? 'none' : 'auto',
      }}
    >
      <img src={LeftArrowIcon} alt="left-arrow" width="10px" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext, isLastItemVisible } = useContext(VisibilityContext);

  return (
    <Typography
      onClick={() => !isLastItemVisible && scrollNext()}
      className="right-arrow"
      style={{
        opacity: isLastItemVisible ? 0.5 : 1,
        pointerEvents: isLastItemVisible ? 'none' : 'auto',
      }}
    >
      <img src={RightArrowIcon} alt="right-arrow" width="10px" />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => (
  <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
    <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
      {data.map((item) => (
        <Box
          key={item.id || item}
          itemId={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          {bodyParts ? (
            <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
          ) : (
            <ExerciseCard exercise={item} />
          )}
        </Box>
      ))}
    </ScrollMenu>
  </Box>
);

export default HorizontalScrollbar;



