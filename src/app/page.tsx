import { MdOutlineContentCopy } from "react-icons/md";

export default function Home() {
	return (
		<div className="flex flex-col gap-y-6 max-w-[950px] mt-10 px-4 mx-auto tracking-wider">
			<div>
				<h1 className="font-semibold text-[28px]">AI Blog Post Writer</h1>
				<p className="font-light text-black/70">
					Generate AI-powered blog posts in second
				</p>
			</div>

			<input
				type="text"
				placeholder="Enter a topic or keywords"
				className="border border-gray-300 rounded-md outline-none font-light py-3 md:py-2 px-3 text-black/70 placeholder:text-black/70"
			/>

			<button className="bg-blue-500 hover:bg-blue-600 transition-all py-3 md:py-2 rounded-md text-white cursor-pointer font-medium text-[18px]">
				Generate
			</button>

			<div className="mx-auto border-gray-400 border border-t-transparent w-8 h-8 mt-3 rounded-full animate-spin"></div>

			<div className="flex flex-col gap-y-2">
				<div className="flex justify-between items-center">
					<span className="font-medium text-lg">Generated Blog Post</span>
					<MdOutlineContentCopy className="text-gray-500 cursor-pointer size-5" />
				</div>

				<div className="border border-gray-300 w-full rounded-md p-2">
					<p className="font-light">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
						laboriosam earum non, optio vitae doloremque eaque sequi veritatis.
						In maiores architecto eum ex quaerat ipsam ad impedit praesentium,
						iusto facilis?
					</p>
				</div>
			</div>
		</div>
	);
}
