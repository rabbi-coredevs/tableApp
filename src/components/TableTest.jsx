
import { Airplane, ArrowCircleLeft, ArrowCircleRight, CircleNotch } from '@phosphor-icons/react';
import TableSkeleton from './TableSkeleton';

const data = [
  { name: 'update', 
    Icon: Airplane,
   },
  {
    name: 'delete',
    Icon: function Icon({ data, onClick }) {
      return <p onClick={() => onClick(data)} className='border' style={{ cursor: "pointer", margin: 'auto' }}>Remove</p>
    },
    onClick: (data) => { console.log(data) },
  },
];

const data2 = [
  {
    head: 'id',
    key: 'id',
    modify: (val) => "#" + val.slice(0, 4)
  },
  {
    head: 'Product name',
    key: 'description',
  },
  {
    head: 'Buying price',
    key: 'do.now',
  },
  {
    head: 'selling price',
    key: 'do.later',
    onClick: (val) => console.log(val)
  },
  {
    head: 'tax',
    key: 'age',
    Comp: function comps({ data }) {
      return <p className='bg-red-50 border'>{data.age}</p>
    }
  },
  {
    head: 'image',
    key: 'img',
    Comp: function image({ data }) {
      return <img className="h-9 w-9 rounded-full text-center border-red-900 border-2 mt-auto" src={data.img} alt="alt" />
    },
  },
]

const data3 = [
  {
    "id": "65291d274c3a8e3b244b94a0",
    "img": 'https://www.refactoringui.com/_next/static/media/book.5380927448c9872170bbc9fc9e5828c4.png',
    "name": "eu deserunt ex",
    "description": "Voluptate culpa\r\n",
    "discount": 4,
    "available": 15,
    "price": 827,
    "sold": 5,
    "age": 39,
    "tax": 4,
    "do": {
      "now": 2,
      "later": 3
    }
  },
  {
    "id": "65291d274c3a8e3b244b94a1",
    "img": 'https://www.refactoringui.com/_next/static/media/book.5380927448c9872170bbc9fc9e5828c4.png',
    "name": "eu deserunt ex",
    "description": "Voluptate culpa\r\n",
    "discount": 4,
    "available": 15,
    "price": 827,
    "sold": 5,
    "age": 39,
    "tax": 4,
    "do": {
      "now": 4,
      "later": 5
    }
  },
  {
    "id": "65291d274c3a8e3b244b94a2",
    "img": 'https://www.refactoringui.com/_next/static/media/book.5380927448c9872170bbc9fc9e5828c4.png',
    "name": "eu deserunt ex",
    "description": "Voluptate culpa\r\n",
    "discount": 4,
    "available": 15,
    "price": 827,
    "sold": 5,
    "age": 39,
    "tax": 4,
    "do": {
      "now": 6,
      "later": 7
    }
  },
  {
    "id": "65291d274c3a8e3b244b94a3",
    "img": 'https://www.refactoringui.com/_next/static/media/book.5380927448c9872170bbc9fc9e5828c4.png',
    "name": "eu deserunt ex",
    "description": "Voluptate culpa\r\n",
    "discount": 4,
    "available": 15,
    "price": 827,
    "sold": 5,
    "age": 39,
    "tax": 4,
    "do": {
      "now": 9,
      "later": 10
    }
  },
];

export default function TableTest() {
  return (
    <section>
      <TableSkeleton
        styles={{
          wrapper: {
            style: { width: "80%", margin: "auto" },
            className: ``,
          },
          table: {
            headerGroup: {
              style: { border: "2px solid red" },
              className: ``,
            },
            headerRow: {
              style: {
                borderBottom: "1px solid #E1E3E5", borderTop: "1px solid #E1E3E5", textTransform: "uppercase", textAlign: "left", fontSize: "16px", color: "#001E17"
              },
              className: ``,
            },
            header: {
              style: { paddingTop: "4px", paddingBottom: "4px" },
              className: ``,
            },
            headerAction: {
              style: { border: "2px solid bla ck" },
              className: ``,
            },
            body: {
              style: { border: "2px solid gre en" },
              className: ``,
            },
            row: {
              style: { borderTop: "1px solid #E1E3E5", borderBottom: "1px solid #E1E3E5", fontSize: "16px", textAlign: "left", color: "#001E17", ":hover": {} },
              className: ``,
            },
            rowData: {
              style: { border: "2px solid yel low" },
              className: ``
            },
            rowAction: {
              style: { border: "2px solid gree n" },
              className: ``,
            },
            actionIcon: {
              style: { margin: "auto" },
              className: ``
            },
            loadingWrapper: {
              style: { border: "2px solid gre en" },
              className: ``
            },
            loading: {
              style: { border: "2px solid blu e", },
              className: ``
            }
          },
          pagination: {
            wrapper: {
              style: { border: "1px solid gre en" },
              className: ``
            },
            text: {
              style: { border: "1px solid gre en" },
              className: ``
            },
            buttonWrapper: {
              style: { border: "1px solid gr een" },
              className: ``
            },
            buttons: {
              style: { background: "gre en" },
              className: ``
            },
            prev: {
              style: { border: "2px solid re d" },
              className: ``
            },
            next: {
              style: { border: "2px solid blu e" },
              className: ``
            },
            pages: {
              style: { background: "blu e" },
              className: ``
            },
            activePage: {
              style: { background: "re d" },
              className: ``
            }
          }
        }}
        actions={data}
        config={data2}
        data={data3}
        LoadingIcon={CircleNotch}
        pagination={{
          showPage: true,
          totalDocs: 4,
          totalPage: 1,
          page: 1,
          limit: 10,
          onChange: (num) => console.log(num),
          buttons: {
            Prev: ArrowCircleLeft,
            Next: ArrowCircleRight,
          }
        }}
      />
    </section>
  );
}