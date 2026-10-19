import React, { useState, useRef } from 'react';
import './App.css';
import {
  QcCheckIcon,
  JobsIcon,
  ReportsIcon,
  CphLogIcon,
  SettingsIcon,
  DocumentIcon,
  GreenCheckCircle,
  RedCrossCircle,
  OrangeWarningCircle,
  GreyReviewCircle,
  ExternalLinkIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SparkleIcon,
  PlusIcon,
  CloseIcon,
  FullReportIcon
} from './components/Icons';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('QC Check');

  // Uploaded files state
  const [files, setFiles] = useState({
    original: {
      name: 'Campaign_V1.pdf',
      type: 'PDF, JPG, PNG',
      label: 'Original V1',
      colorClass: 'icon-blue',
      iconColor: '#2563EB'
    },
    orchestra: {
      name: 'BM_Comments.pdf',
      type: 'PDF (BM comments)',
      label: 'Orchestra Comments',
      colorClass: 'icon-red',
      iconColor: '#EF4444'
    },
    revised: {
      name: 'Campaign_Amended.pdf',
      type: 'PDF, JPG, PNG',
      label: 'Revised File',
      colorClass: 'icon-purple',
      iconColor: '#7C3AED'
    }
  });

  // UI States
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(null); // 'original' | 'revised' | null
  const [selectedComment, setSelectedComment] = useState(null);

  // Hidden file inputs
  const originalInputRef = useRef(null);
  const orchestraInputRef = useRef(null);
  const revisedInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleRemoveFile = (key, e) => {
    e.stopPropagation();
    setFiles((prev) => ({
      ...prev,
      [key]: { ...prev[key], name: null }
    }));
    showToast(`Removed ${files[key].label} file.`);
  };

  const handleFileChange = (key, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [key]: { ...prev[key], name: file.name }
      }));
      showToast(`Uploaded ${file.name} to ${files[key].label}`);
    }
  };

  const handleRunQcCheck = () => {
    setIsRunningCheck(true);
    showToast('Running AI QC validation across amendment files...');
    setTimeout(() => {
      setIsRunningCheck(false);
      showToast('QC Check complete: 4 of 5 comments validated successfully.');
    }, 1200);
  };

  const handleNewCheck = () => {
    setFiles({
      original: {
        name: 'Campaign_V1.pdf',
        type: 'PDF, JPG, PNG',
        label: 'Original V1',
        colorClass: 'icon-blue',
        iconColor: '#2563EB'
      },
      orchestra: {
        name: 'BM_Comments.pdf',
        type: 'PDF (BM comments)',
        label: 'Orchestra Comments',
        colorClass: 'icon-red',
        iconColor: '#EF4444'
      },
      revised: {
        name: 'Campaign_Amended.pdf',
        type: 'PDF, JPG, PNG',
        label: 'Revised File',
        colorClass: 'icon-purple',
        iconColor: '#7C3AED'
      }
    });
    showToast('New Check initialized with campaign templates.');
  };

  const commentsList = [
    {
      id: 1,
      text: 'Update headline text',
      status: 'passed',
      detail: 'Changed from "GLOW NATURALLY" to "RADIANT SKIN DAILY". Font family matched Cormorant Garamond / Playfair.'
    },
    {
      id: 2,
      text: 'Change product image',
      status: 'passed',
      detail: 'Product jar updated with metallic gold lid on natural textured sandstone with jasmine flower.'
    },
    {
      id: 3,
      text: 'Update disclaimer text',
      status: 'failed',
      detail: 'Amendment note BM-402 requested footnote "*Individual results may vary" at base. Missing in revised asset.'
    },
    {
      id: 4,
      text: 'Adjust CTA button',
      status: 'passed',
      detail: 'Secondary call-to-action layout and tracking verified.'
    },
    {
      id: 5,
      text: 'Correct brand logo spacing',
      status: 'passed',
      detail: '24px safe margin clear space respected around brand insignia.'
    }
  ];

  return (
    <div className="app-container">
      {/* 1. Top Window Titlebar Row */}
      <div className="window-titlebar">
        <div className="window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        <button
          className="user-profile"
          onClick={() => showToast('Signed in as Asgar (Lead Art Director)')}
          title="User Profile"
        >
          <div className="avatar-circle">A</div>
          <span className="user-name">Asgar</span>
          <span className="user-chevron">
            <ChevronDownIcon size={11} color="#64748B" />
          </span>
        </button>
      </div>

      {/* Main Layout: Left Sidebar + Main Content */}
      <div className="dashboard-body">
        {/* 2. Left Sidebar */}
        <aside className="sidebar">
          <div className="brand-wrap">
            <h1 className="brand-text">WPP</h1>
          </div>

          <nav>
            <ul className="sidebar-nav">
              <li>
                <button
                  className={`sidebar-btn ${activeTab === 'QC Check' ? 'active' : ''}`}
                  onClick={() => setActiveTab('QC Check')}
                >
                  <span className="sidebar-icon">
                    <QcCheckIcon
                      size={17}
                      color={activeTab === 'QC Check' ? '#2563EB' : '#64748B'}
                    />
                  </span>
                  <span>QC Check</span>
                </button>
              </li>

              <li>
                <button
                  className={`sidebar-btn ${activeTab === 'Jobs' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Jobs');
                    showToast('Jobs view: 12 active campaigns in pipeline');
                  }}
                >
                  <span className="sidebar-icon">
                    <JobsIcon
                      size={17}
                      color={activeTab === 'Jobs' ? '#2563EB' : '#64748B'}
                    />
                  </span>
                  <span>Jobs</span>
                </button>
              </li>

              <li>
                <button
                  className={`sidebar-btn ${activeTab === 'Reports' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Reports');
                    setShowReportModal(true);
                  }}
                >
                  <span className="sidebar-icon">
                    <ReportsIcon
                      size={17}
                      color={activeTab === 'Reports' ? '#2563EB' : '#64748B'}
                    />
                  </span>
                  <span>Reports</span>
                </button>
              </li>

              <li>
                <button
                  className={`sidebar-btn ${activeTab === 'CPH Log' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('CPH Log');
                    showToast('CPH Log: All validation transactions synced');
                  }}
                >
                  <span className="sidebar-icon">
                    <CphLogIcon
                      size={17}
                      color={activeTab === 'CPH Log' ? '#2563EB' : '#64748B'}
                    />
                  </span>
                  <span>CPH Log</span>
                </button>
              </li>

              <li>
                <button
                  className={`sidebar-btn ${activeTab === 'Settings' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('Settings');
                    showToast('Settings: AI Threshold set to 95%');
                  }}
                >
                  <span className="sidebar-icon">
                    <SettingsIcon
                      size={17}
                      color={activeTab === 'Settings' ? '#2563EB' : '#64748B'}
                    />
                  </span>
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* 3. Main Content Area */}
        <main className="main-viewport">
          {/* Main Page Heading and Top Action */}
          <div className="page-header">
            <div>
              <h2 className="page-title">Amendment QC</h2>
              <p className="page-subtitle">
                Upload your files and let AI validate the changes.
              </p>
            </div>

            <button className="btn-new-check" onClick={handleNewCheck}>
              <PlusIcon size={12} color="#FFFFFF" />
              <span>New Check</span>
            </button>
          </div>

          {/* 4. Three Upload Panels + Run QC Check Button */}
          <div className="upload-row">
            {/* Hidden file inputs */}
            <input
              type="file"
              ref={originalInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange('original', e)}
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <input
              type="file"
              ref={orchestraInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange('orchestra', e)}
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <input
              type="file"
              ref={revisedInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange('revised', e)}
              accept=".pdf,.png,.jpg,.jpeg"
            />

            {/* Panel 1 — Original V1 */}
            <div
              className="upload-panel"
              onClick={() => !files.original.name && originalInputRef.current?.click()}
            >
              <div className="upload-panel-top">
                <div className="upload-panel-info">
                  <div className={`upload-icon-container ${files.original.colorClass}`}>
                    <DocumentIcon size={16} color={files.original.iconColor} />
                  </div>
                  <div className="upload-text-box">
                    <span className="upload-heading">{files.original.label}</span>
                    <span className="upload-formats">{files.original.type}</span>
                  </div>
                </div>

                <div className="upload-check-badge">
                  <GreenCheckCircle size={15} />
                </div>
              </div>

              <div className="upload-divider-line" />

              <div className="upload-panel-bottom">
                {files.original.name ? (
                  <>
                    <span className="upload-file-label" title={files.original.name}>
                      {files.original.name}
                    </span>
                    <button
                      className="btn-remove"
                      onClick={(e) => handleRemoveFile('original', e)}
                      title="Remove file"
                    >
                      <CloseIcon size={11} color="#94A3B8" />
                    </button>
                  </>
                ) : (
                  <span
                    className="btn-upload-action"
                    onClick={() => originalInputRef.current?.click()}
                  >
                    + Upload File
                  </span>
                )}
              </div>
            </div>

            {/* Panel 2 — Orchestra Comments */}
            <div
              className="upload-panel"
              onClick={() => !files.orchestra.name && orchestraInputRef.current?.click()}
            >
              <div className="upload-panel-top">
                <div className="upload-panel-info">
                  <div className={`upload-icon-container ${files.orchestra.colorClass}`}>
                    <DocumentIcon size={16} color={files.orchestra.iconColor} />
                  </div>
                  <div className="upload-text-box">
                    <span className="upload-heading">{files.orchestra.label}</span>
                    <span className="upload-formats">{files.orchestra.type}</span>
                  </div>
                </div>

                <div className="upload-check-badge">
                  <GreenCheckCircle size={15} />
                </div>
              </div>

              <div className="upload-divider-line" />

              <div className="upload-panel-bottom">
                {files.orchestra.name ? (
                  <>
                    <span className="upload-file-label" title={files.orchestra.name}>
                      {files.orchestra.name}
                    </span>
                    <button
                      className="btn-remove"
                      onClick={(e) => handleRemoveFile('orchestra', e)}
                      title="Remove file"
                    >
                      <CloseIcon size={11} color="#94A3B8" />
                    </button>
                  </>
                ) : (
                  <span
                    className="btn-upload-action"
                    onClick={() => orchestraInputRef.current?.click()}
                  >
                    + Upload File
                  </span>
                )}
              </div>
            </div>

            {/* Panel 3 — Revised File */}
            <div
              className="upload-panel"
              onClick={() => !files.revised.name && revisedInputRef.current?.click()}
            >
              <div className="upload-panel-top">
                <div className="upload-panel-info">
                  <div className={`upload-icon-container ${files.revised.colorClass}`}>
                    <DocumentIcon size={16} color={files.revised.iconColor} />
                  </div>
                  <div className="upload-text-box">
                    <span className="upload-heading">{files.revised.label}</span>
                    <span className="upload-formats">{files.revised.type}</span>
                  </div>
                </div>

                <div className="upload-check-badge">
                  <GreenCheckCircle size={15} />
                </div>
              </div>

              <div className="upload-divider-line" />

              <div className="upload-panel-bottom">
                {files.revised.name ? (
                  <>
                    <span className="upload-file-label" title={files.revised.name}>
                      {files.revised.name}
                    </span>
                    <button
                      className="btn-remove"
                      onClick={(e) => handleRemoveFile('revised', e)}
                      title="Remove file"
                    >
                      <CloseIcon size={11} color="#94A3B8" />
                    </button>
                  </>
                ) : (
                  <span
                    className="btn-upload-action"
                    onClick={() => revisedInputRef.current?.click()}
                  >
                    + Upload File
                  </span>
                )}
              </div>
            </div>

            {/* Run QC Check button */}
            <button
              className={`btn-run-qc ${isRunningCheck ? 'loading' : ''}`}
              onClick={handleRunQcCheck}
              disabled={isRunningCheck}
            >
              <SparkleIcon size={13} color="#FFFFFF" />
              <span>{isRunningCheck ? 'Validating...' : 'Run QC Check'}</span>
            </button>
          </div>

          {/* 5. Main Comparison Area & QC Results */}
          <div className="comparison-area">
            {/* Original V1 preview panel */}
            <section className="preview-column">
              <div className="preview-top-bar">
                <span className="preview-title">Original V1</span>
                <button
                  className="btn-expand"
                  onClick={() => setPreviewModal('original')}
                  title="Open Original V1 Full Preview"
                >
                  <ExternalLinkIcon size={14} color="#94A3B8" />
                </button>
              </div>

              <div className="preview-artwork-frame">
                <img
                  src="/original_v1.png"
                  alt="Original V1 Artwork - GLOW NATURALLY"
                  className="preview-img"
                />
              </div>
            </section>

            {/* Revised File preview panel */}
            <section className="preview-column">
              <div className="preview-top-bar">
                <span className="preview-title">Revised File</span>
                <button
                  className="btn-expand"
                  onClick={() => setPreviewModal('revised')}
                  title="Open Revised File Full Preview"
                >
                  <ExternalLinkIcon size={14} color="#94A3B8" />
                </button>
              </div>

              <div className="preview-artwork-frame">
                <img
                  src="/revised_file.png"
                  alt="Revised File Artwork - RADIANT SKIN DAILY"
                  className="preview-img"
                />
              </div>
            </section>

            {/* 6. QC Results panel */}
            <aside className="qc-results-column">
              <div className="results-header-row">
                <span className="results-heading">QC Results</span>
                <span className="badge-passed">Passed</span>
              </div>

              {/* Circular Progress Indicator */}
              <div className="progress-container">
                <div className="progress-circle-box">
                  <svg className="progress-svg" viewBox="0 0 44 44">
                    <circle
                      className="progress-circle-bg"
                      cx="22"
                      cy="22"
                      r="18"
                    />
                    <circle
                      className="progress-circle-fill"
                      cx="22"
                      cy="22"
                      r="18"
                      strokeDasharray={113.1}
                      strokeDashoffset={113.1 * (1 - 0.8)}
                    />
                  </svg>
                  <span className="progress-score-text">4/5</span>
                </div>
                <span className="progress-label-text">Comments completed</span>
              </div>

              {/* Status Breakdown Summary */}
              <ul className="status-list">
                <li className="status-row">
                  <div className="status-left">
                    <GreenCheckCircle size={14} />
                    <span>Completed</span>
                  </div>
                  <span className="status-val">4</span>
                </li>

                <li className="status-row">
                  <div className="status-left">
                    <RedCrossCircle size={14} />
                    <span>Missed</span>
                  </div>
                  <span className="status-val">1</span>
                </li>

                <li className="status-row">
                  <div className="status-left">
                    <OrangeWarningCircle size={14} />
                    <span>Unintended changes</span>
                  </div>
                  <span className="status-val">0</span>
                </li>

                <li className="status-row">
                  <div className="status-left">
                    <GreyReviewCircle size={14} />
                    <span>Needs review</span>
                  </div>
                  <span className="status-val">0</span>
                </li>
              </ul>

              <div className="divider" />

              {/* Comments Section */}
              <div className="comments-header-row">
                <span className="comments-title">Comments</span>
                <span className="comments-badge">5</span>
              </div>

              <ul className="comments-list">
                {commentsList.map((c) => (
                  <li
                    key={c.id}
                    className="comment-item"
                    onClick={() => setSelectedComment(c)}
                    title="Click to view comment detail"
                  >
                    <div className="comment-main">
                      {c.status === 'passed' ? (
                        <GreenCheckCircle size={13} />
                      ) : (
                        <RedCrossCircle size={13} />
                      )}
                      <span className="comment-label">{c.text}</span>
                    </div>
                    <span className="comment-arrow">
                      <ChevronRightIcon size={12} color="#94A3B8" />
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom Action: View Full Report */}
              <button
                className="btn-full-report"
                onClick={() => setShowReportModal(true)}
              >
                <FullReportIcon size={13} color="#1E293B" />
                <span>View Full Report</span>
              </button>
            </aside>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && <div className="toast-notice">{toastMessage}</div>}

      {/* Full Report Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">WPP Amendment QC Validation Report</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowReportModal(false)}
              >
                <CloseIcon size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '16px' }}>
                <span className="badge-passed" style={{ fontSize: '12px' }}>
                  Overall Status: Passed (4/5 Completed)
                </span>
                <p style={{ marginTop: '8px', fontSize: '13px', color: '#475569' }}>
                  Campaign: <strong>Luxe Radiance Daily Skincare Launch</strong> | Generated by WPP AI QC Engine
                </p>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px' }}>Item</th>
                    <th style={{ padding: '8px 12px' }}>Description</th>
                    <th style={{ padding: '8px 12px' }}>Status</th>
                    <th style={{ padding: '8px 12px' }}>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {commentsList.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{item.text}</td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>{item.detail}</td>
                      <td style={{ padding: '10px 12px' }}>
                        {item.status === 'passed' ? (
                          <span style={{ color: '#16A34A', fontWeight: 600 }}>✓ Completed</span>
                        ) : (
                          <span style={{ color: '#EF4444', fontWeight: 600 }}>✗ Missed</span>
                        )}
                      </td>
                      <td style={{ padding: '10px 12px', color: '#64748B' }}>
                        {item.status === 'passed' ? '99.4%' : '98.1%'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  className="btn-new-check"
                  onClick={() => {
                    showToast('Exported report as PDF.');
                    setShowReportModal(false);
                  }}
                >
                  Download PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Preview Modal */}
      {previewModal && (
        <div className="modal-overlay" onClick={() => setPreviewModal(null)}>
          <div
            className="modal-dialog"
            style={{ maxWidth: '520px', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">
                {previewModal === 'original' ? 'Original V1 Artwork' : 'Revised File Artwork'}
              </h3>
              <button
                className="modal-close-btn"
                onClick={() => setPreviewModal(null)}
              >
                <CloseIcon size={16} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: '16px' }}>
              <img
                src={previewModal === 'original' ? '/original_v1.png' : '/revised_file.png'}
                alt="Full Preview"
                style={{ width: '100%', borderRadius: '8px', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Comment Detail Modal */}
      {selectedComment && (
        <div className="modal-overlay" onClick={() => setSelectedComment(null)}>
          <div
            className="modal-dialog"
            style={{ maxWidth: '480px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">{selectedComment.text}</h3>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedComment(null)}
              >
                <CloseIcon size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                {selectedComment.status === 'passed' ? (
                  <span className="badge-passed">Status: Completed</span>
                ) : (
                  <span
                    className="badge-passed"
                    style={{ background: '#FEE2E2', color: '#DC2626' }}
                  >
                    Status: Missed in Revision
                  </span>
                )}
              </div>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                {selectedComment.detail}
              </p>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn-new-check"
                  onClick={() => setSelectedComment(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
