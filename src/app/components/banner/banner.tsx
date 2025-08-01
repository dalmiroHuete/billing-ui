import React from "react";
import {Box} from "@chakra-ui/react";

interface BannerProps {
    imageSrc: string;
}

const Banner: React.FC<BannerProps> = ({ imageSrc }) => {
    return (
        <Box
            flex="1"
            bgImage={`url('${imageSrc}')`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            position="relative"
            overflow="hidden"
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            justifyContent="center"
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bg="blackAlpha.200"
            />
        </Box>
    );
};

export default Banner;
