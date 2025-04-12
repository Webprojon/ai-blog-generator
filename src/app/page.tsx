"use client";
import { useState, useEffect } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";
import { IoCheckmark } from "react-icons/io5";
import { marked } from "marked";

const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
	const [data, setData] = useState<string>("");
	const [displayedText, setDisplayedText] = useState<string>("");
	const [isCopied, setIsCopied] = useState<boolean>(false);

	async function runChat(prompt: string) {
		const genAI = new GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: MODEL_NAME });

		const generationConfig = {
			temperature: 0.9,
			topK: 1,
			topP: 1,
			maxOutputTokens: 2048,
		};

		const safetySettings = [
			{
				category: HarmCategory.HARM_CATEGORY_HARASSMENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
		];

		const chat = model.startChat({
			generationConfig,
			safetySettings,
			history: [
				{
					role: "user",
					parts: [{ text: "HELLO" }],
				},
				{
					role: "model",
					parts: [{ text: "Hello there! How can I assist you today?" }],
				},
			],
		});

		const result = await chat.sendMessage(prompt);
		const response = result.response;
		setData(response.text());
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const prompt = (event.target as HTMLFormElement)?.prompt?.value || "";
		runChat(prompt);
	};

	useEffect(() => {
		if (!data) return;

		let index = 0;
		const intervalId = setInterval(() => {
			setDisplayedText((prev) => prev + data[index]);
			index += 1;
			if (index === data.length) {
				clearInterval(intervalId);
			}
		}, 15);

		return () => clearInterval(intervalId);
	}, [data]);

	const handleCopy = () => {
		navigator.clipboard
			.writeText(displayedText)
			.then(() => {
				setIsCopied(true);
				setTimeout(() => setIsCopied(false), 2000);
			})
			.catch((error) => {
				console.error("Matn nusxalashda xato:", error);
			});
	};

	return (
		<div className="flex flex-col gap-y-6 max-w-[950px] mt-10 px-4 mx-auto tracking-wider">
			<div>
				<h1 className="font-semibold text-[28px]">AI Gemini</h1>
				<p className="font-light text-black/70">Generate AI-powered text</p>
			</div>

			<form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
				<input
					type="text"
					name="prompt"
					autoComplete="off"
					placeholder="Enter a topic or keywords"
					className="border border-gray-300 rounded-md outline-none font-light py-3 md:py-2 px-3 text-black/70 placeholder:text-black/70"
				/>

				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 transition-all py-3 md:py-2 rounded-md text-white cursor-pointer font-medium text-[18px]"
				>
					Generate
				</button>
			</form>

			{displayedText && (
				<div className="flex flex-col gap-y-2">
					<div className="flex justify-between items-center">
						<span className="font-medium text-lg">Generated Text</span>
						{isCopied ? (
							<IoCheckmark className="size-5 text-green-500" />
						) : (
							<MdOutlineContentCopy
								className="text-gray-500 cursor-pointer size-5"
								onClick={handleCopy}
							/>
						)}
					</div>

					<div className="border border-gray-300 w-full rounded-md py-2 px-4 mb-4">
						{/*<div className="font-light">{displayedText}</div>*/}
						<div
							className="font-light"
							dangerouslySetInnerHTML={{ __html: marked(displayedText) }}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
