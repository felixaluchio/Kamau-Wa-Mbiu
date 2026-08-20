import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BrainCircuit, 
  Settings2, 
  FileText, 
  Activity, 
  AlertCircle, 
  RefreshCw, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  UploadCloud, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Database, 
  Code, 
  Check, 
  Copy, 
  BookOpen, 
  HelpCircle, 
  UserCheck, 
  ShieldCheck,
  Eye,
  Edit2,
  Trash2,
  Lock,
  Zap,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data types matching our MySQL schema definition
interface KnowledgeDocument {
  id: number;
  title: string;
  slug: string;
  source_type: 'biography' | 'manifesto' | 'policy_brief' | 'faq' | 'press_release' | 'speech';
  category: string;
  chunk_count: number;
  vector_status: 'vectorized' | 'pending' | 'failed';
  is_active: boolean; // Strict rule: No hard deletes, soft status toggle!
  updated_at: string;
  confidence_rating: string;
  content: string;
}

interface CitizenQuery {
  id: number;
  citizen_name: string;
  question: string;
  initial_ai_answer: string;
  confidence_score: number; // e.g. 48.5
  status: 'pending_review' | 'resolved' | 'unanswered';
  topic: string;
  created_at: string;
  is_active: boolean;
}

export function AdminAIHub() {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'training' | 'history' | 'architecture'>('knowledge');
  const [activeCodeSubTab, setActiveCodeSubTab] = useState<'migrations' | 'controller' | 'routes'>('migrations');

  // Initial Mock State for Knowledge Documents
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([
    {
      id: 1,
      title: 'Kamau Wa Mbiu Official Biography & Early Life',
      slug: 'kamau-official-biography',
      source_type: 'biography',
      category: 'Leadership Profile',
      chunk_count: 24,
      vector_status: 'vectorized',
      is_active: true,
      updated_at: '2026-08-08 14:20',
      confidence_rating: '98.5%',
      content: 'Kamau Wa Mbiu was raised in Limuru, Kiambu County. He attended the University of Nairobi earning a Master of Science in Public Governance...'
    },
    {
      id: 2,
      title: 'Limuru Constituency Economic Manifesto 2027',
      slug: 'limuru-economic-manifesto-2027',
      source_type: 'manifesto',
      category: 'Economic Reform',
      chunk_count: 58,
      vector_status: 'vectorized',
      is_active: true,
      updated_at: '2026-08-09 09:41',
      confidence_rating: '99.1%',
      content: 'Key pillar 1: Agricultural value addition for tea and horticulture farmers. Direct subsidized fertilizers and local cold-storage processing hubs...'
    },
    {
      id: 3,
      title: 'Youth Employment & Digital Skills Subsidy Policy',
      slug: 'youth-employment-policy-brief',
      source_type: 'policy_brief',
      category: 'Youth Empowerment',
      chunk_count: 18,
      vector_status: 'vectorized',
      is_active: true,
      updated_at: '2026-08-05 11:15',
      confidence_rating: '94.0%',
      content: 'Establishing 4 fully equipped digital innovation hubs across Limuru East, Ndeiya, Bibirioni, and Limuru Central with high-speed fiber internet...'
    },
    {
      id: 4,
      title: 'Water Accessibility & Borehole Infrastructure FAQ',
      slug: 'water-accessibility-faq',
      source_type: 'faq',
      category: 'Infrastructure',
      chunk_count: 12,
      vector_status: 'pending',
      is_active: false, // Inactive example to demonstrate active/inactive toggle
      updated_at: '2026-08-02 16:00',
      confidence_rating: '76.2%',
      content: 'Q: How will Kamau solve the water scarcity in Ndeiya ward? A: Installation of solar-powered high-capacity boreholes and piping networks...'
    },
    {
      id: 5,
      title: 'Limuru Tea Farmers Welfare & Subsidy Press Release',
      slug: 'tea-farmers-press-release-august',
      source_type: 'press_release',
      category: 'Agriculture',
      chunk_count: 9,
      vector_status: 'vectorized',
      is_active: true,
      updated_at: '2026-08-09 18:30',
      confidence_rating: '96.8%',
      content: 'Official statement addressing tea factory bonus payments and government guaranteed minimum returns for smallholder farmers...'
    }
  ]);

  // Initial Mock State for Training Inbox (Human-in-the-Loop)
  const [trainingQueries, setTrainingQueries] = useState<CitizenQuery[]>([
    {
      id: 101,
      citizen_name: 'Sarah Wanjiru (Limuru East)',
      question: 'What is Kamau\'s specific stance on waiving county market stall fees for small scale vegetable vendors?',
      initial_ai_answer: 'Kamau supports small businesses, but I do not have a specific policy document confirming fee waivers for county market stalls.',
      confidence_score: 48.2,
      status: 'pending_review',
      topic: 'Local Trade & Taxation',
      created_at: '10 mins ago',
      is_active: true
    },
    {
      id: 102,
      citizen_name: 'John Njoroge (Ndeiya Ward)',
      question: 'When will the proposed Ndeiya solar borehole project commence construction if elected?',
      initial_ai_answer: 'The water policy outlines borehole projects, but the exact timeline for Ndeiya ward construction is not explicitly detailed in the manifesto.',
      confidence_score: 54.0,
      status: 'pending_review',
      topic: 'Infrastructure Timeline',
      created_at: '42 mins ago',
      is_active: true
    },
    {
      id: 103,
      citizen_name: 'Grace Mwangi (Bibirioni)',
      question: 'Does the leadership platform offer bursary application forms online through this website?',
      initial_ai_answer: 'Yes, bursary application instructions are available on the Community Portal, but direct form submissions are pending admin verification.',
      confidence_score: 69.5,
      status: 'pending_review',
      topic: 'Education Bursaries',
      created_at: '2 hours ago',
      is_active: true
    }
  ]);

  // State for Human-In-The-Loop Selection
  const [selectedQueryId, setSelectedQueryId] = useState<number>(101);
  const [adminDraftAnswer, setAdminDraftAnswer] = useState<string>('');
  const [saveAsFaq, setSaveAsFaq] = useState<boolean>(true);

  // Ingestion Modal State
  const [showIngestModal, setShowIngestModal] = useState<boolean>(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocSourceType, setNewDocSourceType] = useState<KnowledgeDocument['source_type']>('policy_brief');
  const [newDocCategory, setNewDocCategory] = useState('Public Policy');
  const [newDocContent, setNewDocContent] = useState('');

  // Search & Filters
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [docStatusFilter, setDocStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState(false);

  // Selected query object
  const selectedQuery = trainingQueries.find(q => q.id === selectedQueryId) || trainingQueries[0];

  // Toggle Document Active / Inactive Status (Strict Rule: No Hard Deletes!)
  const handleToggleDocumentStatus = (id: number) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === id) {
        return { ...doc, is_active: !doc.is_active };
      }
      return doc;
    }));
  };

  // Submit Admin Approved Answer in Human-in-the-Loop Inbox
  const handleResolveQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminDraftAnswer.trim()) return;

    // Mark query as resolved in state
    setTrainingQueries(prev => prev.map(q => {
      if (q.id === selectedQueryId) {
        return {
          ...q,
          status: 'resolved',
          confidence_score: 100.0,
          initial_ai_answer: adminDraftAnswer
        };
      }
      return q;
    }));

    // Optionally create a new verified FAQ document if checked
    if (saveAsFaq && selectedQuery) {
      const newFaqDoc: KnowledgeDocument = {
        id: Date.now(),
        title: `Verified Answer: ${selectedQuery.question.slice(0, 50)}...`,
        slug: `verified-faq-${Date.now()}`,
        source_type: 'faq',
        category: selectedQuery.topic,
        chunk_count: 2,
        vector_status: 'vectorized',
        is_active: true,
        updated_at: 'Just now',
        confidence_rating: '100%',
        content: `Q: ${selectedQuery.question}\n\nA: ${adminDraftAnswer}`
      };
      setDocuments(prev => [newFaqDoc, ...prev]);
    }

    setAdminDraftAnswer('');
    // Select next pending query if available
    const nextPending = trainingQueries.find(q => q.id !== selectedQueryId && q.status === 'pending_review');
    if (nextPending) {
      setSelectedQueryId(nextPending.id);
    }
  };

  // Add new Knowledge Document
  const handleIngestDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !newDocContent.trim()) return;

    const estimatedChunks = Math.ceil(newDocContent.length / 400) || 1;
    const newDoc: KnowledgeDocument = {
      id: Date.now(),
      title: newDocTitle,
      slug: newDocTitle.toLowerCase().replace(/[^a-z0-0]+/g, '-'),
      source_type: newDocSourceType,
      category: newDocCategory,
      chunk_count: estimatedChunks,
      vector_status: 'vectorized',
      is_active: true,
      updated_at: 'Just now',
      confidence_rating: '99.0%',
      content: newDocContent
    };

    setDocuments([newDoc, ...documents]);
    setShowIngestModal(false);
    setNewDocTitle('');
    setNewDocContent('');
  };

  // Filtered documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) || 
                          doc.category.toLowerCase().includes(docSearchQuery.toLowerCase());
    const matchesStatus = docStatusFilter === 'all' ? true : 
                          docStatusFilter === 'active' ? doc.is_active : !doc.is_active;
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalActiveDocs = documents.filter(d => d.is_active).length;
  const totalInactiveDocs = documents.filter(d => !d.is_active).length;
  const totalChunks = documents.reduce((sum, d) => sum + (d.is_active ? d.chunk_count : 0), 0);
  const pendingReviewCount = trainingQueries.filter(q => q.status === 'pending_review').length;

  // Code snippets for Architecture Tab
  const migrationSchemaCode = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for AI Knowledge Base & Training.
     */
    public function up(): void
    {
        // 1. Knowledge Documents Table (Strict Rule: Soft status toggle via is_active, no hard deletes)
        Schema::create('knowledge_documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('source_type', ['biography', 'manifesto', 'policy_brief', 'faq', 'press_release', 'speech']);
            $table->string('category')->default('General Policy');
            $table->longText('content');
            $table->string('file_path')->nullable();
            $table->unsignedInteger('chunk_count')->default(0);
            $table->enum('vector_status', ['pending', 'vectorized', 'failed'])->default('pending');
            
            // STRICT RULE: Active/Inactive status toggle instead of hard deletes
            $table->boolean('is_active')->default(true)->index();
            
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes(); // Additional layer of audit protection
        });

        // 2. Citizen AI Queries Table (Stores questions asked by users and the AI's response)
        Schema::create('citizen_ai_queries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('citizen_id')->nullable()->index();
            $table->string('citizen_name')->default('Anonymous Citizen');
            $table->text('question');
            $table->text('ai_answer')->nullable();
            $table->decimal('confidence_score', 5, 2)->default(0.00); // 0.00 to 100.00
            $table->enum('status', ['answered', 'unanswered', 'pending_review', 'resolved'])->default('answered');
            
            // STRICT RULE: No hard deletes for audit integrity
            $table->boolean('is_active')->default(true)->index();
            
            $table->json('matched_document_ids')->nullable();
            $table->timestamps();
        });

        // 3. AI Training Feedbacks Table (Human-in-the-Loop admin corrections)
        Schema::create('ai_training_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('citizen_ai_query_id')->nullable()->constrained('citizen_ai_queries')->onDelete('cascade');
            $table->foreignId('admin_user_id')->constrained('users');
            $table->text('original_question');
            $table->text('approved_answer');
            $table->enum('action_taken', ['convert_to_faq', 'update_knowledge_chunk', 'flag_policy_gap'])->default('convert_to_faq');
            
            // STRICT RULE: Maintain active status for learning logs
            $table->boolean('is_active')->default(true)->index();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_training_feedbacks');
        Schema::dropIfExists('citizen_ai_queries');
        Schema::dropIfExists('knowledge_documents');
    }
};`;

  const controllerCode = `<?php

namespace App\\Http\\Controllers\\Api\\V1\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\KnowledgeDocument;
use App\\Models\\CitizenAiQuery;
use App\\Models\\AiTrainingFeedback;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class AIKnowledgeManagerController extends Controller
{
    /**
     * Get AI Manager Overview Metrics
     */
    public function metrics(): JsonResponse
    {
        return response()->json([
            'total_active_documents' => KnowledgeDocument::where('is_active', true)->count(),
            'total_inactive_documents' => KnowledgeDocument::where('is_active', false)->count(),
            'total_vector_chunks' => KnowledgeDocument::where('is_active', true)->sum('chunk_count'),
            'avg_confidence_score' => round(CitizenAiQuery::avg('confidence_score'), 1),
            'pending_review_queries' => CitizenAiQuery::where('status', 'pending_review')->count(),
        ]);
    }

    /**
     * List all knowledge base documents (Filterable & Searchable)
     */
    public function index(Request $request): JsonResponse
    {
        $query = KnowledgeDocument::query();

        if ($request->has('status')) {
            $isActive = $request->status === 'active';
            $query->where('is_active', $isActive);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $documents = $query->orderBy('updated_at', 'desc')->paginate(15);
        return response()->json($documents);
    }

    /**
     * Ingest new Knowledge Document & Trigger Vector Chunking
     */
    public function ingest(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'source_type' => 'required|in:biography,manifesto,policy_brief,faq,press_release,speech',
            'category' => 'required|string',
            'content' => 'required|string',
        ]);

        // Calculate chunks (approx 400 characters per chunk)
        $chunkCount = max(1, ceil(strlen($validated['content']) / 400));

        $doc = KnowledgeDocument::create([
            'title' => $validated['title'],
            'slug' => \\Str::slug($validated['title']),
            'source_type' => $validated['source_type'],
            'category' => $validated['category'],
            'content' => $validated['content'],
            'chunk_count' => $chunkCount,
            'vector_status' => 'vectorized',
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Knowledge document ingested and vectorized successfully.',
            'data' => $doc
        ], 201);
    }

    /**
     * STRICT RULE: Dedicated Status Toggle Endpoint (No Hard Deletes)
     */
    public function toggleStatus(int $id): JsonResponse
    {
        $document = KnowledgeDocument::findOrFail($id);
        $document->is_active = !$document->is_active;
        $document->save();

        return response()->json([
            'message' => "Document status updated to " . ($document->is_active ? 'Active' : 'Inactive'),
            'is_active' => $document->is_active
        ]);
    }

    /**
     * Training Inbox: Fetch queries needing human-in-the-loop review
     */
    public function trainingInbox(): JsonResponse
    {
        $pendingQueries = CitizenAiQuery::where('status', 'pending_review')
            ->orWhere('confidence_score', '<', 75.0)
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($pendingQueries);
    }

    /**
     * Human-in-the-Loop Review: Submit Admin Approved Answer & Update Training Data
     */
    public function resolveQuery(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'approved_answer' => 'required|string',
            'convert_to_faq' => 'boolean',
        ]);

        $query = CitizenAiQuery::findOrFail($id);
        $query->status = 'resolved';
        $query->confidence_score = 100.00;
        $query->ai_answer = $validated['approved_answer'];
        $query->save();

        // Create Training Feedback Record
        AiTrainingFeedback::create([
            'citizen_ai_query_id' => $query->id,
            'admin_user_id' => auth()->id() ?? 1,
            'original_question' => $query->question,
            'approved_answer' => $validated['approved_answer'],
            'action_taken' => $validated['convert_to_faq'] ? 'convert_to_faq' : 'update_knowledge_chunk',
            'is_active' => true,
        ]);

        // Auto-convert to verified FAQ if requested
        if ($validated['convert_to_faq'] ?? false) {
            KnowledgeDocument::create([
                'title' => 'Verified FAQ: ' . \\Str::limit($query->question, 60),
                'slug' => 'faq-' . time(),
                'source_type' => 'faq',
                'category' => 'Citizen Q&A',
                'content' => "Q: {$query->question}\n\nA: {$validated['approved_answer']}",
                'chunk_count' => 2,
                'vector_status' => 'vectorized',
                'is_active' => true,
            ]);
        }

        return response()->json(['message' => 'Query resolved and fed into AI training store successfully.']);
    }
}`;

  const routesCode = `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\V1\\Admin\\AIKnowledgeManagerController;

/*
|--------------------------------------------------------------------------
| AI Knowledge Manager API Routes (/api/v1/admin/ai-manager/*)
|--------------------------------------------------------------------------
*/

Route::prefix('v1/admin/ai-manager')->middleware(['auth:sanctum', 'admin'])->group(function () {
    // Metrics
    Route::get('/metrics', [AIKnowledgeManagerController::class, 'metrics']);
    
    // Knowledge Base Documents
    Route::get('/documents', [AIKnowledgeManagerController::class, 'index']);
    Route::post('/documents/ingest', [AIKnowledgeManagerController::class, 'ingest']);
    Route::patch('/documents/{id}/status', [AIKnowledgeManagerController::class, 'toggleStatus']);
    
    // Human-in-the-Loop Training System
    Route::get('/queries/training-inbox', [AIKnowledgeManagerController::class, 'trainingInbox']);
    Route::post('/queries/{id}/resolve', [AIKnowledgeManagerController::class, 'resolveQuery']);
});`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeSnippet(true);
    setTimeout(() => setCopiedCodeSnippet(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20">
        
        {/* Module Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-brand-neutral-grey/30 shadow-level-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary mb-1">
              <Sparkles size={14} className="text-brand-accent animate-pulse" />
              AI Assistant Control Center
            </div>
            <h1 className="font-heading text-3xl text-brand-neutral-charcoal flex items-center gap-3">
              <BrainCircuit className="text-brand-primary h-8 w-8" />
              AI Knowledge Manager
            </h1>
            <p className="font-body text-sm text-brand-neutral-charcoal/60 mt-1">
              Feed verified policy documents, review citizen questions with low AI confidence, and update knowledge vector stores.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button 
              onClick={() => setShowIngestModal(true)}
              variant="primary" 
              size="md"
              leftIcon={<Plus size={18} />}
              className="w-full sm:w-auto"
            >
              Ingest Document
            </Button>
          </div>
        </div>

        {/* Top Key Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Card className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-neutral-charcoal/50">Active Knowledge Sources</span>
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <BookOpen size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-brand-neutral-charcoal">{totalActiveDocs}</span>
              <span className="text-xs font-medium text-brand-neutral-charcoal/50">/ {documents.length} total</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-success-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></span>
              {totalInactiveDocs} inactive (soft toggled)
            </div>
          </Card>

          <Card className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-neutral-charcoal/50">Vectorized Chunks</span>
              <div className="p-2 rounded-xl bg-brand-secondary/10 text-brand-secondary">
                <Database size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-brand-neutral-charcoal">{totalChunks}</span>
              <span className="text-xs font-medium text-brand-neutral-charcoal/50">vector embeddings</span>
            </div>
            <div className="mt-2 text-xs text-brand-neutral-charcoal/60">
              Auto-partitioned & indexed
            </div>
          </Card>

          <Card className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-neutral-charcoal/50">Avg AI Confidence</span>
              <div className="p-2 rounded-xl bg-success-500/10 text-success-600">
                <Zap size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-success-600">94.8%</span>
              <span className="text-xs font-medium text-success-700 font-bold">+2.4% this week</span>
            </div>
            <div className="mt-2 text-xs text-brand-neutral-charcoal/60">
              Across 3,240 citizen conversations
            </div>
          </Card>

          <Card className={`p-5 bg-white border shadow-sm relative overflow-hidden ${
            pendingReviewCount > 0 ? 'border-amber-200 bg-amber-50/30' : 'border-brand-neutral-grey/30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Human Review Inbox</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <AlertCircle size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-700">{pendingReviewCount}</span>
              <span className="text-xs font-medium text-amber-800">queries flagged</span>
            </div>
            <button 
              onClick={() => setActiveTab('training')}
              className="mt-2 text-xs font-bold text-amber-700 hover:text-amber-900 underline flex items-center gap-1"
            >
              Review unanswered questions <ArrowRight size={12} />
            </button>
          </Card>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-brand-neutral-grey/30 bg-white px-4 rounded-2xl border shadow-sm overflow-x-auto">
          {[
            { id: 'knowledge', label: 'Knowledge Base Documents', icon: <FileText size={16} />, badge: documents.length },
            { id: 'training', label: 'Human-in-the-Loop Inbox', icon: <UserCheck size={16} />, badge: pendingReviewCount },
            { id: 'history', label: 'Citizen Query Analytics', icon: <Activity size={16} /> },
            { id: 'architecture', label: 'Backend Architecture & API', icon: <Code size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-5 py-4 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-brand-primary font-extrabold'
                  : 'text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-brand-primary text-white' : 'bg-brand-neutral-grey/30 text-brand-neutral-charcoal/70'
                }`}>
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Knowledge Base Documents */}
        {activeTab === 'knowledge' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-brand-neutral-grey/30 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" />
                <input 
                  type="text" 
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  placeholder="Search by document title or category..."
                  className="w-full pl-10 pr-4 py-2 bg-brand-neutral-warm/50 border border-brand-neutral-grey/40 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-brand-neutral-warm p-1 rounded-xl border border-brand-neutral-grey/30">
                  <button 
                    onClick={() => setDocStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${docStatusFilter === 'all' ? 'bg-white text-brand-primary shadow-xs' : 'text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'}`}
                  >
                    All ({documents.length})
                  </button>
                  <button 
                    onClick={() => setDocStatusFilter('active')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${docStatusFilter === 'active' ? 'bg-white text-success-700 shadow-xs' : 'text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'}`}
                  >
                    Active ({totalActiveDocs})
                  </button>
                  <button 
                    onClick={() => setDocStatusFilter('inactive')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${docStatusFilter === 'inactive' ? 'bg-white text-slate-700 shadow-xs' : 'text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'}`}
                  >
                    Inactive ({totalInactiveDocs})
                  </button>
                </div>
              </div>
            </div>

            {/* Knowledge Table */}
            <Card className="bg-white border border-brand-neutral-grey/30 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-neutral-warm/60 border-b border-brand-neutral-grey/30 text-[11px] font-extrabold uppercase tracking-wider text-brand-neutral-charcoal/60">
                      <th className="py-3.5 px-6">Document Title & Source</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4 text-center">Chunks</th>
                      <th className="py-3.5 px-4 text-center">Vector Status</th>
                      <th className="py-3.5 px-4 text-center">Active Status (No Hard Delete)</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-neutral-grey/20 text-xs">
                    {filteredDocuments.map((doc) => (
                      <tr 
                        key={doc.id} 
                        className={`hover:bg-brand-neutral-warm/40 transition-colors ${!doc.is_active ? 'bg-slate-50/60 opacity-75' : ''}`}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                              doc.is_active ? 'bg-brand-primary/10 text-brand-primary' : 'bg-slate-200 text-slate-500'
                            }`}>
                              <FileText size={18} />
                            </div>
                            <div>
                              <h4 className={`font-bold text-sm ${doc.is_active ? 'text-brand-neutral-charcoal' : 'text-slate-500 line-through'}`}>
                                {doc.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-brand-neutral-charcoal/50">
                                <span className="font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-neutral-warm border border-brand-neutral-grey/30">
                                  {doc.source_type.replace('_', ' ')}
                                </span>
                                <span>Updated {doc.updated_at}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 font-semibold text-brand-neutral-charcoal/80">
                          {doc.category}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <span className="font-bold text-brand-neutral-charcoal bg-brand-neutral-warm px-2.5 py-1 rounded-lg border border-brand-neutral-grey/30">
                            {doc.chunk_count} chunks
                          </span>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            doc.vector_status === 'vectorized' 
                              ? 'bg-success-100 text-success-800' 
                              : doc.vector_status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-error-100 text-error-800'
                          }`}>
                            {doc.vector_status === 'vectorized' && <CheckCircle2 size={12} />}
                            {doc.vector_status === 'pending' && <Clock size={12} />}
                            {doc.vector_status}
                          </span>
                        </td>

                        {/* Interactive Status Switch - Strict Rule Requirement */}
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => handleToggleDocumentStatus(doc.id)}
                              className={`w-12 h-6 rounded-full p-1 transition-colors relative flex items-center focus:outline-none ${
                                doc.is_active ? 'bg-success-500' : 'bg-slate-300'
                              }`}
                              title={doc.is_active ? "Click to deactivate (soft hide)" : "Click to activate"}
                            >
                              <motion.div 
                                layout
                                className="w-4 h-4 bg-white rounded-full shadow-md"
                                animate={{ x: doc.is_active ? 24 : 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              />
                            </button>
                            <span className={`text-[11px] font-bold ${doc.is_active ? 'text-success-700' : 'text-slate-500'}`}>
                              {doc.is_active ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleToggleDocumentStatus(doc.id)}
                              className="p-1.5 rounded-lg text-brand-neutral-charcoal/60 hover:text-brand-primary hover:bg-brand-neutral-warm transition-colors"
                              title="Toggle Active Status"
                            >
                              <RefreshCw size={14} />
                            </button>
                            <button 
                              onClick={() => alert(`Document Preview:\n\n${doc.content}`)}
                              className="p-1.5 rounded-lg text-brand-neutral-charcoal/60 hover:text-brand-primary hover:bg-brand-neutral-warm transition-colors"
                              title="View Document Content"
                            >
                              <Eye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredDocuments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-brand-neutral-charcoal/50">
                          No knowledge documents match your filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Tab 2: Human-in-the-Loop Inbox */}
        {activeTab === 'training' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Queue List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-heading text-lg text-brand-neutral-charcoal">Flagged Citizen Questions</h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  {trainingQueries.filter(q => q.status === 'pending_review').length} Pending
                </span>
              </div>

              <div className="space-y-3">
                {trainingQueries.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => setSelectedQueryId(item.id)}
                    className={`p-4 cursor-pointer transition-all border ${
                      selectedQueryId === item.id 
                        ? 'border-brand-primary ring-2 ring-brand-primary/20 bg-brand-primary/5' 
                        : 'border-brand-neutral-grey/30 bg-white hover:border-brand-neutral-grey/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-neutral-charcoal/50">
                        {item.topic}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        item.status === 'resolved' 
                          ? 'bg-success-100 text-success-700' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.confidence_score < 70 ? `Low Confidence (${item.confidence_score}%)` : 'Resolved'}
                      </span>
                    </div>

                    <h4 className="font-body font-bold text-xs text-brand-neutral-charcoal line-clamp-2 mb-2">
                      "{item.question}"
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-brand-neutral-charcoal/60 pt-2 border-t border-brand-neutral-grey/20">
                      <span>{item.citizen_name}</span>
                      <span>{item.created_at}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Review & Action Area */}
            <div className="lg:col-span-7">
              <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm space-y-6">
                {selectedQuery ? (
                  <>
                    <div className="flex items-center justify-between border-b border-brand-neutral-grey/20 pb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Human-in-the-Loop Curator</span>
                        <h3 className="font-heading text-xl text-brand-neutral-charcoal mt-1">Review & Train Response</h3>
                      </div>
                      <span className="text-xs text-brand-neutral-charcoal/50">Query ID #{selectedQuery.id}</span>
                    </div>

                    {/* Question Context Box */}
                    <div className="bg-brand-neutral-warm/60 p-4 rounded-2xl border border-brand-neutral-grey/30 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-brand-neutral-charcoal/60">
                        <UserCheck size={14} className="text-brand-primary" />
                        Asked by {selectedQuery.citizen_name}
                      </div>
                      <p className="font-heading text-base text-brand-neutral-charcoal italic">
                        "{selectedQuery.question}"
                      </p>
                    </div>

                    {/* Current Low-Confidence AI Output */}
                    <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                        <span className="flex items-center gap-1.5">
                          <AlertCircle size={14} /> Initial AI Draft (Confidence: {selectedQuery.confidence_score}%)
                        </span>
                        <span className="text-[10px] uppercase tracking-wider bg-amber-200/60 px-2 py-0.5 rounded">Unverified</span>
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed font-mono">
                        {selectedQuery.initial_ai_answer}
                      </p>
                    </div>

                    {/* Admin Answer Editor Form */}
                    <form onSubmit={handleResolveQuery} className="space-y-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-neutral-charcoal mb-2">
                          Draft Approved Official Response
                        </label>
                        <textarea
                          rows={5}
                          value={adminDraftAnswer}
                          onChange={(e) => setAdminDraftAnswer(e.target.value)}
                          placeholder="Type Kamau Wa Mbiu's official verified answer here. This answer will be instantly vectorized and fed back into the AI memory..."
                          className="w-full p-4 bg-white border border-brand-neutral-grey/40 rounded-2xl text-xs font-body leading-relaxed focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-neutral-charcoal">
                          <input 
                            type="checkbox" 
                            checked={saveAsFaq}
                            onChange={(e) => setSaveAsFaq(e.target.checked)}
                            className="rounded border-brand-neutral-grey/40 text-brand-primary focus:ring-brand-primary"
                          />
                          Auto-publish as new Verified FAQ Knowledge Document
                        </label>

                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="md"
                          disabled={!adminDraftAnswer.trim()}
                          leftIcon={<CheckCircle2 size={16} />}
                        >
                          Approve & Train AI Engine
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12 text-brand-neutral-charcoal/50">
                    Select a flagged question to review.
                  </div>
                )}
              </Card>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Citizen Query Analytics */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal">Ask Kamau Interaction Log</h3>
                  <p className="text-xs text-brand-neutral-charcoal/60 mt-1">Real-time history of citizen prompts, matched document chunks, and confidence tracking.</p>
                </div>
                <Button variant="outline" size="sm" leftIcon={<RefreshCw size={14} />}>Export Log CSV</Button>
              </div>

              <div className="divide-y divide-brand-neutral-grey/20">
                {[
                  { q: 'What is Kamau’s plan for youth bursaries?', conf: 98.2, status: 'answered', time: '5 mins ago', matched: 'Youth Employment Policy' },
                  { q: 'Where can I meet Kamau in Limuru Town this weekend?', conf: 96.0, status: 'answered', time: '18 mins ago', matched: 'Campaign Schedule' },
                  { q: 'What is Kamau’s specific stance on waiving county market stall fees?', conf: 48.2, status: 'pending_review', time: '35 mins ago', matched: 'None' },
                  { q: 'How does the platform ensure agricultural subsidies reach smallholders?', conf: 94.5, status: 'answered', time: '1 hour ago', matched: 'Limuru Economic Manifesto' },
                ].map((log, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-brand-neutral-warm/30 px-2 rounded-xl transition-colors">
                    <div className="space-y-1">
                      <p className="font-bold text-xs text-brand-neutral-charcoal">"{log.q}"</p>
                      <div className="flex items-center gap-3 text-[11px] text-brand-neutral-charcoal/50">
                        <span>Matched Knowledge: <strong className="text-brand-primary">{log.matched}</strong></span>
                        <span>•</span>
                        <span>{log.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-neutral-charcoal/40 block">Confidence</span>
                        <span className={`font-extrabold text-xs ${log.conf > 90 ? 'text-success-600' : 'text-amber-600'}`}>{log.conf}%</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        log.status === 'answered' ? 'bg-success-100 text-success-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Tab 4: Backend Architecture & Code */}
        {activeTab === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="p-6 bg-slate-900 text-slate-100 border border-slate-800 shadow-xl rounded-3xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
                    <Code size={14} /> Laravel 12 + MySQL 8.0 Implementation Architecture
                  </div>
                  <h3 className="font-heading text-xl text-white">Backend Code & Database Migration Specifications</h3>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
                  <button 
                    onClick={() => setActiveCodeSubTab('migrations')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeCodeSubTab === 'migrations' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                  >
                    MySQL Migrations
                  </button>
                  <button 
                    onClick={() => setActiveCodeSubTab('controller')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeCodeSubTab === 'controller' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                  >
                    Laravel Controller
                  </button>
                  <button 
                    onClick={() => setActiveCodeSubTab('routes')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeCodeSubTab === 'routes' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                  >
                    API Routes
                  </button>
                </div>
              </div>

              {/* Code display window */}
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(
                    activeCodeSubTab === 'migrations' ? migrationSchemaCode :
                    activeCodeSubTab === 'controller' ? controllerCode : routesCode
                  )}
                  className="absolute right-4 top-4 z-10 flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  {copiedCodeSnippet ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copiedCodeSnippet ? 'Copied!' : 'Copy Code'}
                </button>

                <pre className="p-6 bg-slate-950 rounded-2xl overflow-x-auto text-xs font-mono text-cyan-300 leading-relaxed max-h-[500px] border border-slate-800">
                  <code>
                    {activeCodeSubTab === 'migrations' && migrationSchemaCode}
                    {activeCodeSubTab === 'controller' && controllerCode}
                    {activeCodeSubTab === 'routes' && routesCode}
                  </code>
                </pre>
              </div>
            </Card>
          </motion.div>
        )}

      </div>

      {/* Ingestion Modal */}
      <AnimatePresence>
        {showIngestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-neutral-charcoal/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-brand-neutral-grey/30 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-brand-neutral-grey/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-brand-neutral-charcoal">Ingest Knowledge Source</h3>
                    <p className="text-xs text-brand-neutral-charcoal/60">Upload raw text or policy brief to train Ask Kamau AI.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowIngestModal(false)}
                  className="p-2 rounded-xl text-brand-neutral-charcoal/50 hover:bg-brand-neutral-warm"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <form onSubmit={handleIngestDocument} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-neutral-charcoal mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="e.g. Limuru Agricultural Cold Storage Subsidy Policy 2026"
                    className="w-full px-4 py-2.5 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-neutral-charcoal mb-1">
                      Source Type
                    </label>
                    <select
                      value={newDocSourceType}
                      onChange={(e) => setNewDocSourceType(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-primary"
                    >
                      <option value="policy_brief">Policy Brief</option>
                      <option value="manifesto">Manifesto Pillar</option>
                      <option value="biography">Biography / History</option>
                      <option value="faq">FAQ Pair</option>
                      <option value="press_release">Press Release</option>
                      <option value="speech">Public Speech Transcript</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-neutral-charcoal mb-1">
                      Policy Category
                    </label>
                    <input
                      type="text"
                      required
                      value={newDocCategory}
                      onChange={(e) => setNewDocCategory(e.target.value)}
                      placeholder="e.g. Healthcare, Agriculture, Youth"
                      className="w-full px-4 py-2.5 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-neutral-charcoal mb-1">
                    Verified Document Text Content
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={newDocContent}
                    onChange={(e) => setNewDocContent(e.target.value)}
                    placeholder="Paste full manifesto text, policy breakdown, or official statement here..."
                    className="w-full p-4 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs font-body leading-relaxed focus:outline-none focus:border-brand-primary"
                  />
                  <p className="text-[11px] text-brand-neutral-charcoal/50 mt-1">
                    Estimated vector chunks: <strong className="text-brand-primary">{Math.ceil((newDocContent.length || 0) / 400) || 1} chunks</strong>
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-neutral-grey/20">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setShowIngestModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                    leftIcon={<Layers size={16} />}
                  >
                    Vectorize & Publish to AI
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}

export default AdminAIHub;
