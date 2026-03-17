'use client';

import React from 'react';
import Link from 'next/link';

const ExploreBtn = () => {
    return (
        <button type="button" id="explore-btn" className="mt-10 mx-auto">
            <Link href="#events" className="flex items-center gap-2">
                Explore events
                <img
                    src="/icons/arrow-down.svg"
                    alt="arrow-down"
                    width={24}
                    height={24}
                />
            </Link>
        </button>
    );
};

export default ExploreBtn;