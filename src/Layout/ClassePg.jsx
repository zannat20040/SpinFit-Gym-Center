import React from 'react';

const ClassePg = () => {
    const { isLoading, data: classes } = useQuery({
        queryKey: ["forums"],
        queryFn: async () => {
          const res = await fetch(`http://localhost:5000/application?role=trainer`);
          return res.json();
        },
      });

    return (
        <div>
            
        </div>
    );
};

export default ClassePg;