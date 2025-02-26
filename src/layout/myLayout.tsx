import React from 'react';

export default function MyLayout({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);
  return (
    <>
      {childrenArray.map((child, index) => {
        return (
          <div className="flex h-full flex-col" key={index}>
            <div className="px-5">{child}</div>
            {childrenArray && index < childrenArray.length - 1 && (
              <div className="my-5 h-2 w-full max-w-[400px] bg-back_gray"></div>
            )}
          </div>
        );
      })}
    </>
  );
}
