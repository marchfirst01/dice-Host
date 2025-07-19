import Image from 'next/image';
import { useRouter } from 'next/router';

export function ImageItem({ imageUrl, id, size }: { imageUrl: string; id?: number; size: number }) {
  const router = useRouter();

  const sizeInRem = size * 4;

  return (
    <div
      className={`flex shrink-0 ${id && 'cursor-pointer'} items-center justify-center overflow-hidden rounded-xl`}
      style={{
        width: `${sizeInRem}px`,
        height: `${sizeInRem}px`,
        aspectRatio: '1/1',
      }}
    >
      <Image
        onClick={() => {
          if (id) {
            router.push(`space/${id}/view`);
          }
        }}
        className="size-full object-cover"
        // TODO: imageUrl 수정
        src={
          imageUrl === 'www.example.com'
            ? 'https://cmc-dice-bucket.s3.ap-northeast-2.amazonaws.com/34/721b1afb-dcdb-4f52-b5ce-851d37003338.jpg'
            : imageUrl
        }
        alt="image"
        width={size * 4}
        height={size * 4}
      />
    </div>
  );
}
