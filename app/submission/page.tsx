"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CheckCircle2, Download, UploadCloud } from "lucide-react";
import Link from "next/link";

const SubmissionCenterPage = () => {
  const [submissionStatus, setSubmissionStatus] = useState("pending"); // 'pending', 'validating', 'ready', 'submitted'
  const [fileName, setFileName] = useState("");
  const [validationProgress, setValidationProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSubmissionStatus("validating");
      setValidationProgress(0);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setValidationProgress(progress);
        }
        if (progress >= 100) {
          clearInterval(interval);
          setSubmissionStatus("ready");
        }
      }, 200);
    }
  };

  const handleDownloadLeaderboard = () => {
    // Simulate file download
    alert("Downloading current leaderboard data...");
  };

  const handleSubmit = () => {
    setSubmissionStatus("submitted");
    alert("Submission successful!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 overflow-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Submission Center</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload and Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold mb-4 text-white">Upload Submission (submission.csv)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600/50 rounded-lg bg-[#09090b]">
              <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Select CSV File
              </label>
              {fileName && (
                <p className="mt-4 text-gray-300">File selected: <span className="font-medium text-white">{fileName}</span></p>
              )}

              {submissionStatus === "validating" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 w-full max-w-sm"
                >
                  <p className="text-blue-400 text-sm mb-2">Validating... {validationProgress}%</p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      className="bg-blue-600 h-2.5 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${validationProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>
              )}

              {submissionStatus === "ready" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6 flex items-center text-green-400"
                >
                  <CheckCircle2 className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Ready for Submission!</span>
                </motion.div>
              )}

              {submissionStatus === "ready" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="mt-6"
                >
                  <Button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-full text-white hover:opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    Finalize Submission
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard Preview & Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold mb-4 text-white">Current Leaderboard Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-gray-400 mb-4">
                Review the latest candidate rankings before finalizing your submission.
              </p>
              <Link href="/ranking" passHref>
                <Button
                  variant="outline"
                  className="w-full mb-4 text-blue-400 border-blue-500/50 hover:bg-blue-600/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  View Full Leaderboard
                </Button>
              </Link>
              <Button
                onClick={handleDownloadLeaderboard}
                className="w-full bg-cyan-600/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-600/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <Download className="h-4 w-4 mr-2" /> Download Current Leaderboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SubmissionCenterPage;
